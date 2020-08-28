package com.cg.UniversityAdmissionSystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.cg.UniversityAdmissionSystem.Entity.Courses;
import com.cg.UniversityAdmissionSystem.Exception.DuplicateException;
import com.cg.UniversityAdmissionSystem.Exception.NotFoundException;
import com.cg.UniversityAdmissionSystem.dao.CoursesRepository;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	CoursesRepository coursesRepo;
	
	@Autowired
	RestTemplate restTemplate;
	
	public List<Courses> getCourses()
	{
		List<Courses> courseList= coursesRepo.findAll();
		if(!courseList.isEmpty())
		{
			return courseList;
		}
		else
			throw new NotFoundException("Courses not found");
			
		
	}

	public Courses addCourse(Courses course)
	{
		if(coursesRepo.findByProgramName(course.getProgramName())==null)
			return coursesRepo.save(course);
		else
			throw new DuplicateException("Program is already present");
	}
	
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public void deleteById(int id) {
		int count=0;
		List<Integer> myList=restTemplate.getForObject("http://applicant-service/applicantList/scheduleProgramId", List.class);
		for(Integer scheduleProgramId:myList)
		{
			if(scheduleProgramId==id)
				{count++;}
		}
		if(count==0)
		{	coursesRepo.deleteById(id);

		}
		else
			throw new NotFoundException("Cannot delete the course because some students are enroll in it");
		
		
	}

	@Override
	public Integer getCourseId(String programName) {
		
		return coursesRepo.findIdByProgramName(programName);
	}

	@Override
	public List<String> getProgramList() {
		
		if(!coursesRepo.getProgramList().isEmpty())
		{
			return coursesRepo.getProgramList();
		}
		else
			throw new NotFoundException("ProgramList is not found");
	}
}
