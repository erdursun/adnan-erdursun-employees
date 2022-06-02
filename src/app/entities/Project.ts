import { ProjectEmployee } from "./ProjectEmployee";
import { Team } from "./Team";

export class Project{
    
    private employeeList: ProjectEmployee[];
    private teams: Array<Team>;
    private pairings: string[];
    
    constructor(public projectID: number){
        this.employeeList = [];
        this.pairings = [];
        this.teams = [];
    }

    addEmployee(employee: ProjectEmployee){
        this.employeeList.push(employee);
    }

    getEmployeeList(): ProjectEmployee[]{
        return this.employeeList;
    }

    getTeams(): Array<Team>{
        return this.teams;
    }

    
    calculatePairings(){
        let result: number = 0;
        for(let i = 0; i < this.employeeList.length; i++){
            for(let j = i+1; j < this.employeeList.length; j++){
                result += this.employeeList[i].calculatePairingTime(this.employeeList[j]);
                if(result > 0){
                    this.teams.push(new Team(this.employeeList[i], this.employeeList[j], this.projectID, result));
                    result=0;
                }
            }
        }
        return (result>0)?result:0;
    }


    displayTeams(){
        let result: string = "";
        for(let i = 0; i < this.teams.length; i++){
            result += this.teams[i].displayTeam() + "\n";
        }
        return result;
    }
    
}