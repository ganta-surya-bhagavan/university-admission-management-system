package com.cg.UniversityAdmissionSystem.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cg.UniversityAdmissionSystem.Entity.Schedule;



public interface ScheduleReppository extends JpaRepository<Schedule, Integer> {

	Schedule save(Schedule schedule);
	 void deleteById(int id);
	 
	 @Query("select schedule.programName from Schedule schedule")
	 public List<String> scheduleCourses();
}
