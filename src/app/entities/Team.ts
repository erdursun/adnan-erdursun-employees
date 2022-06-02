import { ProjectEmployee } from './ProjectEmployee';

export class Team{
    constructor(public member1: ProjectEmployee, public member2: ProjectEmployee, public projectID:number, public totalDays: number){

    }

    isSameTeam(otherTeam: Team){
        
        if((this.member1.employeeID == otherTeam.member1.employeeID && this.member2.employeeID == otherTeam.member2.employeeID) ||
            (this.member1.employeeID == otherTeam.member2.employeeID && this.member2.employeeID == otherTeam.member1.employeeID)){
            return true;
        }

        return false;
    }

    displayTeam(){
        return this.member1.employeeID + "," + this.member2.employeeID + "," + this.projectID + "," + this.totalDays;
    }

    teamToTable(){
        return "<tr><td>"+this.member1.employeeID+"</td><td>"+this.member2.employeeID+"</td><td>"+this.projectID+"</td><td>"+this.totalDays+"</td></tr>";
    }

}