package com.cg.UniversityAdmissionSystem.Service;


import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.cg.UniversityAdmissionSystem.Entity.Schedule;
import com.cg.UniversityAdmissionSystem.dao.ScheduleReppository;



class ScheduleServiceImplTest {
	
	
private ScheduleService ser;
	
	@BeforeEach
	public  void start()
	{	
		ser=new ScheduleServiceImpl();
		
	}
	
	@Test
	public void testDeleteSchedule()
	{
		ser.deleteByIdSchedule(5);
		assertFalse(ser.getSchedule().contains(5));
	}
	@Test
	public void testAddSchedule()
	{
		Schedule schedule=new Schedule(7, "Hotel" , "Pune","12/22/2020","12/22/2022",2);
		ser.addSchedule(schedule);
		assertTrue(ser.getSchedule().contains(schedule));
	}

}
