export class ProgramsScheduled
{
scheduledProgramId:number
programName:string
location:string
startDate:string
endDate:string
sessionsPerWeek:number
constructor(id,programName,location,startDate,endDate,sessionsPerWeek)
{this.scheduledProgramId=id;
    this.programName=programName;
    
    this.location=location;
    this.startDate=startDate;
    this.endDate=endDate;
    this.sessionsPerWeek=sessionsPerWeek;

}
}