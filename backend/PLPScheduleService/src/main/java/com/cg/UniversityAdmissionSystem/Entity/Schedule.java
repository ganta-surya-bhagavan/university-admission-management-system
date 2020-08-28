package com.cg.UniversityAdmissionSystem.Entity;




import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Schedule {
	@Id
	private int scheduledProgramId;
	private String programName; 
	private String location;
	private String startDate;
	private String endDate ;
	private int sessionsPerWeek;
	public Schedule(){
		
	}
	public Schedule(int scheduledprogramid, String programName, String location, String startDate, String endDate,
			int sessionsPerWeek) {
		super();
		this.scheduledProgramId = scheduledprogramid;
		this.programName = programName;
		this.location = location;
		this.startDate = startDate;
		this.endDate = endDate;
		this.sessionsPerWeek = sessionsPerWeek;
	}
	
	public int getScheduledProgramId() {
		return scheduledProgramId;
	}
	public void setScheduledProgramId(int scheduledProgramId) {
		this.scheduledProgramId = scheduledProgramId;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public int getSessionsPerWeek() {
		return sessionsPerWeek;
	}
	public void setSessionsPerWeek(int sessionsPerWeek) {
		this.sessionsPerWeek = sessionsPerWeek;
	}
	@Override
	public String toString() {
		return "Schedule [Scheduled_program_id=" + scheduledProgramId + ", programName=" + programName + ", Location="
				+ location + ", startDate=" + startDate + ", endDate=" + endDate + ", sessionsPerWeek="
				+ sessionsPerWeek + "]";
	}
	
}
