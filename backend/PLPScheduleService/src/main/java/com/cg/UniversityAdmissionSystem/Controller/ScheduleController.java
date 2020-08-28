package com.cg.UniversityAdmissionSystem.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.UniversityAdmissionSystem.Entity.Schedule;
import com.cg.UniversityAdmissionSystem.Service.ScheduleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Api("Schedule Service")
public class ScheduleController {

	@Autowired
	ScheduleService scheduleService;
	Logger logger=LoggerFactory.getLogger(ScheduleController.class);
	
	
	@ApiOperation(value = "Get A Schedule List")
	@GetMapping(value = "/scheduleList", produces = "application/json")
	public List<Schedule> getScheduleList() {
		List<Schedule> scheduleList = null;

		scheduleList = scheduleService.getSchedule();
		logger.info("Return the Schedule List Successfully");
		return scheduleList;
	}

	@ApiOperation(value = "Add A Schedule in Schedule List")
	@ApiResponses(value= {
			@ApiResponse(code = 200, message = "Successfully added to Schedule"),
		    @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
		    @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
		    @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
	})
	@PostMapping(value = "/scheduleList", consumes = "application/json", produces = "application/json")
	public Schedule addSchedule(@ApiParam(value="Schedule in JSON Format")@RequestBody Schedule schedule) {
		logger.info("Schedule Added Successfully");
		return scheduleService.addSchedule(schedule);
	}

	@ApiOperation(value = "Delete the Schedule based on the Schedule program Id")
	@DeleteMapping(path = { "/scheduleList/{id}" })
	public void deleteSchedule(@ApiParam(value="ScheduleProgramId  on which course is deleted")@PathVariable("id") int id) {
		logger.info("Schedule deleted Successfully");
		scheduleService.deleteByIdSchedule(id);
	}
	
	@ApiOperation(value = "Update the Schedule Based on the Schedule Program Id")
	@PutMapping(path = { "/scheduleList/{id}" })
	public Schedule updateSchedule(@ApiParam(value="ScheduleProgramId on which Schedule is Updated")@PathVariable("id") int id,@RequestBody Schedule schedule) {
		logger.info("Schedule Updated Successfully");
		return scheduleService.updateSchedule(id,schedule);
	}
	
	@ApiOperation(value = "Get A Available Program Name List")
	 @GetMapping(
	            value= "/programNameList",
	            headers = "Accept=application/json",
	            produces = "application/json"
	    )
	 public List<String> getAvailableProgramName()
	 {
		logger.info("Return get Available Program Name List Successfully");
		 return scheduleService.getAvailableProgramName();
	 }
	 
}
