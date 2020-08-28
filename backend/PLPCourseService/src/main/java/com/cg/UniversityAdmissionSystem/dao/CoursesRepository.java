package com.cg.UniversityAdmissionSystem.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cg.UniversityAdmissionSystem.Entity.Courses;



public interface CoursesRepository extends JpaRepository<Courses, Integer>{
	
	 Courses save(Courses course);
	 void deleteById(int id);
	 public Courses findByProgramName(String programName);
	 @Query("select course.programName from Courses course")
	 public List<String> getProgramList();
	 @Query("select course.courseId from Courses course where course.programName=:programName")
	 public Integer findIdByProgramName(@Param("programName")String programName);
	


}
