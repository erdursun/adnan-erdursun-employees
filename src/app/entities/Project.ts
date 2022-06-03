import { ProjectEmployee } from "./ProjectEmployee";
import { Team } from "./Team";

/* The Project class is used to create a project object that contains a list of employees, a list of
teams, and a list of pairings */
export class Project{
    
    /* Creating a private variable called employeeList that is an array of ProjectEmployee objects. 
    This is used to store the list of employees in the project.
    */
    private employeeList: ProjectEmployee[];

    /* Creating a private variable called teams that is an array of Team objects.
    This is used to store the list of teams in the project.
     */
    private teams: Array<Team>;
    
    constructor(public projectID: number){
        this.employeeList = [];
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
    
  /**
   * For each employee in the list, calculate the pairing time with every other employee in the list,
   * and if the pairing time is greater than 0, add the pair to the list of teams
   * @returns the result of the calculation.
   */
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