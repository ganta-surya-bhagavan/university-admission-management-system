package com.cg.UniversityAdmissionSystem.Entity;




import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import io.swagger.annotations.ApiModelProperty;


@Entity
public class Applicant {
	
	@ApiModelProperty("Applicant ID=Primary Key")
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int applicantId;
	private String fullName;
	private String dateOfBirth;
	private String highestQualification;
	private float marksObtained;
	private String goals;
	private String emailId;
	private Integer scheduledProgramId;
	private String status;
	private String dateOfInterview;
	public Applicant() {
		super();
	}
	public Applicant(int applicantId, String fullName, String dateOfBirth, String highestQualification,
			float marksObtained, String goals, String emailId, int scheduledProgramId, String status,
			String dateOfInterview) {
		super();
		this.applicantId = applicantId;
		this.fullName = fullName;
		this.dateOfBirth = dateOfBirth;
		this.highestQualification = highestQualification;
		this.marksObtained = marksObtained;
		this.goals = goals;
		this.emailId = emailId;
		this.scheduledProgramId = scheduledProgramId;
		this.status = status;
		this.dateOfInterview = dateOfInterview;
	}
	public int getApplicantId() {
		return applicantId;
	}
	public void setApplicantId(int applicantId) {
		this.applicantId = applicantId;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getHighestQualification() {
		return highestQualification;
	}
	public void setHighestQualification(String highestQualification) {
		this.highestQualification = highestQualification;
	}
	public float getMarksObtained() {
		return marksObtained;
	}
	public void setMarksObtained(float marksObtained) {
		this.marksObtained = marksObtained;
	}
	public String getGoals() {
		return goals;
	}
	public void setGoals(String goals) {
		this.goals = goals;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public Integer getScheduledProgramId() {
		return scheduledProgramId;
	}
	public void setScheduledProgramId(Integer scheduledProgramId) {
		this.scheduledProgramId = scheduledProgramId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDateOfInterview() {
		return dateOfInterview;
	}
	public void setDateOfInterview(String dateOfInterview) {
		this.dateOfInterview = dateOfInterview;
	}
	@Override
	public String toString() {
		return "Applicant [applicantId=" + applicantId + ", fullName=" + fullName + ", dateOfBirth=" + dateOfBirth
				+ ", highestQualification=" + highestQualification + ", marksObtained=" + marksObtained + ", goals="
				+ goals + ", emailId=" + emailId + ", scheduledProgramId=" + scheduledProgramId + ", status=" + status
				+ ", dateOfInterview=" + dateOfInterview + "]";
	}

	
}
