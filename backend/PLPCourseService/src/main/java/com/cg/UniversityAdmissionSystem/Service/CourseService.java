package com.cg.UniversityAdmissionSystem.Service;

import java.util.List;

import com.cg.UniversityAdmissionSystem.Entity.Courses;

public interface CourseService {

	public List<Courses> getCourses();
	public Courses addCourse(Courses course);
	public void deleteById(int id);
	public Integer getCourseId(String programName);
	public List<String> getProgramList();
}
