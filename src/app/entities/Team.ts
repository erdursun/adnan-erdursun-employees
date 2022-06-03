import { ProjectEmployee } from './ProjectEmployee';

/* The Team class is used to store the information of a team of two employees working on a project for
a certain number of days */
export class Team{
    /**
     * The constructor function is a function that is called when a new instance of the class is
     * created
     * @param {ProjectEmployee} member1 - ProjectEmployee - The first member of the pair
     * @param {ProjectEmployee} member2 - ProjectEmployee - The second member of the pair.
     * @param {number} projectID - the ID of the project that the two employees are working on
     * @param {number} totalDays - The total number of days that the two employees worked together on
     * the project.
     */
    constructor(public member1: ProjectEmployee, public member2: ProjectEmployee, public projectID:number, public totalDays: number){

    }

    /**
     * If the two teams have the same members, return true, otherwise return false
     * @param {Team} otherTeam - Team - The other team to compare to
     * @returns A boolean value.
     */
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

}