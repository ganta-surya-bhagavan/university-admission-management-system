package com.cg.UniversityAdmissionSystem.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cg.UniversityAdmissionSystem.Entity.Applicant;
import com.cg.UniversityAdmissionSystem.dao.ApplicantRepository;
import com.cg.UniversityAdmissionSystem.Exception.NotFoundException;

@Service
public class ApplicantServiceImpl implements ApplicantService {

	@Autowired
	ApplicantRepository applicantRepo;
	
	@Autowired
	RestTemplate restTemplate;
	
	public List<Applicant> getApplicant()
	{
		return applicantRepo.findAll();
		
	}
	
	
	@Override
	public List<Applicant> getApplicantsByProgramName(String programName) {
		int id=0;
		int count=0;
		List<Applicant> applicantList = new ArrayList<>();
		id=restTemplate.getForObject("http://course-service/courseList/programName="+programName, Integer.class);  
		for(Applicant applicant:applicantRepo.findAll())
		{
			if(applicant.getScheduledProgramId()==id)
				{applicantList.add(applicant);
				count++;}
		}
		if(count!=0)
			return applicantList;
		else
			throw new NotFoundException("No applicant is registred for this Program");
	}


	@Override
	public List<Integer> getScheduleProgramId() {
		
		return applicantRepo.getScheduleProgramId();
	}
	@Override
	public Applicant addApplicant(Applicant applicant) {
		return  applicantRepo.save(applicant);
		
	}


	@Override
	public Optional<Applicant> viewStatusById(Integer id) {
		return applicantRepo.findById(id);
	}


	@Override
	public Applicant updateApplicant(int id, Applicant applicant) {
		if(applicantRepo.existsById(id))
			return applicantRepo.save(applicant);
		else
			throw new NotFoundException("Id is not present");
		
	}
}
