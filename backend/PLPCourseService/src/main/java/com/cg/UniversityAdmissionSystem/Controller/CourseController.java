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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.UniversityAdmissionSystem.Entity.Courses;
import com.cg.UniversityAdmissionSystem.Service.CourseService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Api("Course Service")
public class CourseController {
	
	@Autowired
	CourseService courseService;
	Logger logger=LoggerFactory.getLogger(CourseController.class);
	
	@ApiOperation(value = "Get A Course List")
	@GetMapping(value = "/courseList", produces = "application/json")
	@HystrixCommand(fallbackMethod="gettingCourseListFail",commandKey="gettingCourseList",groupKey="CourseList")
	public List<Courses> getCourseList() {
		List<Courses> courseList = null;
		courseList = courseService.getCourses();
		logger.info("Return a Course List Successfully");
		return courseList;
	}
	public List<Courses> gettingCourseListFail()
	{
		 
		return null;
	}
	
	@ApiOperation(value = "Add a Courses in a Course List")
	@ApiResponses(value= {
			@ApiResponse(code = 200, message = "Successfully added to Courses"),
		    @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
		    @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
		    @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
	})
	@PostMapping(value = "/courseList", consumes = "application/json", produces = "application/json")
	public Courses addCourse(@ApiParam(value="Course in JSON Format")@RequestBody Courses courses) {
		logger.info("Course added Successfully");
		return courseService.addCourse(courses);
	}
	
	@ApiOperation(value = "Delete a Course Based on Course Id")
	@DeleteMapping(path = { "/courseList/id={id}" })
	public void deleteCourse(@ApiParam(value="Course Id on which course is deleted")@PathVariable("id") int id) {
		logger.info("Course Deleted Successfully");
		 courseService.deleteById(id);
	}

	@ApiOperation(value = "Get A Course Id Based on Program Name")
	@GetMapping(value = "/courseList/programName={programName}", produces = "application/json")
	public int getCourseId(@ApiParam(value="Program Name Which Return Course ID")@PathVariable("programName")String programName) {
		logger.info("Find Course Id Based on Program Name Successfully");
		return courseService.getCourseId(programName);
	}
	
	@ApiOperation(value = "Get A Program Name List")
	@GetMapping(value = "/courseList/programList", produces = "application/json")
	@HystrixCommand(fallbackMethod="gettingProgramListFail",commandKey="gettingProgramList",groupKey="ProgramList")
	public List<String> getProgramList() {
		logger.info("Return a Program Name List successfully");
		return courseService.getProgramList();
	}
	public List<String> gettingProgramListFail()
	{
		return null;
	}
	
}
