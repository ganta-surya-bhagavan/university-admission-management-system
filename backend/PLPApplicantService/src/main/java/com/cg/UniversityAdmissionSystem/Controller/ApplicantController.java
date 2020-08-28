package com.cg.UniversityAdmissionSystem.Controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.UniversityAdmissionSystem.Entity.Applicant;

import com.cg.UniversityAdmissionSystem.Service.ApplicantService;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Api("Applicant Service")
public class ApplicantController {

	@Autowired
	ApplicantService applicantService;
	Logger logger=LoggerFactory.getLogger(ApplicantController.class);
	
	@ApiOperation(value = "Get A Applicant List")
	@GetMapping(value = "/applicantList", produces = "application/json")
	public List<Applicant> getApplicantList() {
		List<Applicant> applicantList = null;

		applicantList = applicantService.getApplicant();
		logger.info("Return the applicant List Successfully");
		return applicantList;
	}
	
	
	@ApiOperation(value = "Get a applicant List based on the Program Name")
	 @GetMapping(
	            value= "/applicantList/{programName}",
	            headers = "Accept=application/json",
	            produces = "application/json"
	    )	
	  public List<Applicant> getApplicantsByProgramName(@ApiParam(value="Program Name Which Return ApplicantList")@PathVariable("programName") String programName){
	    logger.info("Return the applicant List based on Program Name Successfully");    
		return applicantService.getApplicantsByProgramName(programName);
	    }
	 
	@ApiOperation(value = "Get a list of Scheduled Program Id")
	 @GetMapping(
	            value= "/applicantList/scheduleProgramId",
	            headers = "Accept=application/json",
	            produces = "application/json"
	    )	
	  public List<Integer> getScheduleProgramId(){
			logger.info("Return the list of Scheduled Program Id");
	        return applicantService.getScheduleProgramId();
	    }
	@ApiOperation(value = "Applicant apply for the course")
	 @PostMapping(
	            value="/applicant",
	            produces = "application/json",
	            headers = "Accept=application/json"
		  )
		public Applicant applyForCourse(@ApiParam(value="Applicant in json format")@RequestBody Applicant applicant) {
		logger.info("Applicant applied successfully");
			 return applicantService.addApplicant(applicant);
		}
	 
	@ApiOperation(value = "View Status of the Applicant")
	 @GetMapping(
	            value= "/applicantList/id={id}",
	            headers = "Accept=application/json",
	            produces = "application/json"
	    )	
	  public Optional<Applicant> viewStatus(@ApiParam(value="Applicant Id Which Return ApplicantList")@PathVariable("id")int id){
			logger.info("Return the Applicant based on id");
	        return applicantService.viewStatusById(id);
	    }
	
	@ApiOperation(value = "Update the applicant based on applicant id")
	 @PutMapping(
	            value="/updateApplicant/{id}",
	            produces = "application/json",
	            headers = "Accept=application/json"
		  )
		public Applicant updateApplicant(@ApiParam(value="ApplicantId on which Applicant is Updated")@PathVariable("id") int id,@RequestBody Applicant applicant) {
		logger.info("Applicant updated successfully");
			 return applicantService.updateApplicant(id,applicant);
		}
	 
	 
	
	 
	 

}
