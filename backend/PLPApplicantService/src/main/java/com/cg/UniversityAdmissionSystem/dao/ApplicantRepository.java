package com.cg.UniversityAdmissionSystem.dao;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cg.UniversityAdmissionSystem.Entity.Applicant;



public interface ApplicantRepository extends JpaRepository<Applicant, Integer>{
	
	@Query("select applicant.scheduledProgramId from Applicant applicant")
	public List<Integer> getScheduleProgramId();
	
}
