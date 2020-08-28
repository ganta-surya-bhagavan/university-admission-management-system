package com.cg.UniversityAdmissionSystem.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.cg.UniversityAdmissionSystem.Entity.Schedule;
import com.cg.UniversityAdmissionSystem.Exception.NotFoundException;
import com.cg.UniversityAdmissionSystem.dao.ScheduleReppository;

@Service
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	ScheduleReppository scheduleRepo;
	
	@Autowired
	RestTemplate restTemplate;
	
	public List<Schedule> getSchedule()
	{
		return scheduleRepo.findAll();
		
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public Schedule addSchedule(Schedule sch)
	{
		return scheduleRepo.save(sch);
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public void deleteByIdSchedule(int id) {
		int count=0;
		List<Integer> myList=restTemplate.getForObject("http://applicant-service/applicantList/scheduleProgramId", List.class);
		for(Integer scheduleProgramId:myList)
		{
			if(scheduleProgramId==id)
				{count++;}
		}
		if(count==0)
		{	scheduleRepo.deleteById(id);

		}
		else
			throw new NotFoundException("Cannot delete the Schedule because some students are enroll in it");
		
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public Schedule updateSchedule(int id, Schedule sched) {
		if(scheduleRepo.existsById(id))
			return scheduleRepo.save(sched);
		else 
			throw new NotFoundException("Id is not present");
			
		
	}
	
	@Override
	public List<String> getAvailableProgramName() {
		Set<String> scheduleCourses=new HashSet<>(scheduleRepo.scheduleCourses());
		Set<String> allCourses=new HashSet<>(restTemplate.getForObject("http://course-service/courseList/programList", List.class));
		allCourses.removeAll(scheduleCourses);
		List<String> availableCourses=new ArrayList<>(allCourses);
		if(!availableCourses.isEmpty())
			return availableCourses;
		else
			throw new NotFoundException("All Courses already Been Schedule");
	}
}
