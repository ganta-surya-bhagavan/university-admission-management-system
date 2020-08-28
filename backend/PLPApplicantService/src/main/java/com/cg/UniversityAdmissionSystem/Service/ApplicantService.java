package com.cg.UniversityAdmissionSystem.Service;

import java.util.List;
import java.util.Optional;

import com.cg.UniversityAdmissionSystem.Entity.Applicant;



public interface ApplicantService {
	public List<Applicant> getApplicant();
	public List<Applicant> getApplicantsByProgramName(String programName);
	public List<Integer> getScheduleProgramId();
	Applicant addApplicant(Applicant applicant) ;
	Optional<Applicant> viewStatusById(Integer id);
	public Applicant updateApplicant(int id,Applicant applicant);
}
