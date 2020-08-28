package com.cg.UniversityAdmissionSystem.Entity;


import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Courses {
	@Id
	private int courseId;
	private String programName;
	private String description;
	private String applicantEligibility;
	private int duration;
	private String degreeCertificateOffered;
	public Courses(){
		
	}
	public Courses(int courseId, String programName, String description, String applicantEligibility, int duration,
			String degreeCertificateOffered) {
		super();
		this.courseId = courseId;
		this.programName = programName;
		this.description = description;
		this.applicantEligibility = applicantEligibility;
		this.duration = duration;
		this.degreeCertificateOffered = degreeCertificateOffered;
	}
	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getApplicantEligibility() {
		return applicantEligibility;
	}
	public void setApplicantEligibility(String applicantEligibility) {
		this.applicantEligibility = applicantEligibility;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getDegreeCertificateOffered() {
		return degreeCertificateOffered;
	}
	public void setDegreeCertificateOffered(String degreeCertificateOffered) {
		this.degreeCertificateOffered = degreeCertificateOffered;
	}
	@Override
	public String toString() {
		return "Courses [courseId=" + courseId + ", programName=" + programName + ", description=" + description
				+ ", applicantEligibility=" + applicantEligibility + ", duration=" + duration
				+ ", degreeCertificateOffered=" + degreeCertificateOffered + "]";
	}
	
	
}
