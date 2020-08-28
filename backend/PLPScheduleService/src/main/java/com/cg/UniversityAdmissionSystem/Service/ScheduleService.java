package com.cg.UniversityAdmissionSystem.Service;

import java.util.List;

import com.cg.UniversityAdmissionSystem.Entity.Schedule;

public interface ScheduleService {

	public List<Schedule> getSchedule();
	public Schedule addSchedule(Schedule sch);
	public void deleteByIdSchedule(int id);
	public Schedule updateSchedule(int id,Schedule schedule);
	public List<String> getAvailableProgramName();
}
