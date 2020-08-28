export class ProgramsOffered
{
            courseId:number
            programName:string
            description:string
            applicantEligibility:string
            duration:number
            degreeCertificateOffered:string
            constructor(id,programName,description,applicantEligibility,duration,degreeCertificateOffered)

            {this.courseId=id;
                this.programName=programName;
                this.description=description;
                this.applicantEligibility=applicantEligibility;
                this.duration=duration;
                this.degreeCertificateOffered=degreeCertificateOffered;

            }
}