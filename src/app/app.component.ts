import { Component } from '@angular/core';
import { Project } from './entities/Project';
import { Team } from './entities/Team';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/* The AppComponent class is the main class of the application. It contains the logic for the
application */
export class AppComponent {

  title = 'TASK : Pair of employees who have worked together';
  txtData: string[];
  displayableData: string;
  projectArray: Array<Project>;
  finalTeams: Array<Team>; 

/**
 * The constructor function is a special function that is called when an object is created from a class
 * @param {UtilityService} utility - UtilityService - This is the service that contains the functions
 * that will be used to parse the data and create the teams.
 */
  constructor(private utility: UtilityService){
    this.txtData = [];
    this.displayableData = "";
    this.projectArray = [];
    this.finalTeams = [];
  }

/**
 * It takes an array of projects, and for each project, it adds the teams of that project to the
 * finalTeams array, but only if the team is not already in the finalTeams array
 * The operation is done in a recursive manner
 * The operation time reduces to O(n) where n is the number of projects using destructive sorting
 * @param projectArray - Array<Project>
 */
  mergeTeamsOfProjects(projectArray: Array<Project>){
    for(let project of projectArray){
      this.finalTeams.push(...new Set([...project.getTeams()]));
    }
  }

 /**
  * This function takes an array of projects and merges the teams of each project into one array of
  * teams
  * @param projectArray - Array<Project> - An array of Project objects.
  */
  mergeTeams(projectArray: Array<Project>){
    this.mergeTeamsOfProjects(projectArray);
    for(let i = 0; i < this.finalTeams.length; i++){
        for(let j = i+1; j < this.finalTeams.length; j++){
          if(this.finalTeams[i].isSameTeam(this.finalTeams[j])){
            this.finalTeams[i].totalDays += this.finalTeams[j].totalDays;
            this.finalTeams.splice(j, 1);
            j--;
          }
        }
      }
  }


/**
 * The onClickSubmit function is called when the user clicks the "Submit" button. It takes the data from the
 * file which is already parsed into an array of strings. 
 * It then creates an array of Project objects, and an array of Team objects. 
 * The Project objects are created by parsing the array of strings. 
 * The Team objects are created by merging the Project objects into one array of teams.
 * @param event any - this is the event that is triggered when the button is clicked.
 */
  onClickSubmit(event: any){
    this.displayableData="";
    this.txtData.forEach(element => {
      this.displayableData+=element + '\n';
    });

    this.finalTeams = [];
    this.projectArray.forEach(element => {
      element.calculatePairings();
    });

    this.mergeTeams(this.projectArray);

    console.log("Employee#1, Employee#2, CommonProjectID, DaysWorked" +'\n');
    this.finalTeams.forEach(team => {
      console.log(team.displayTeam());
    });
  }

  /**
   * This function is called when the user clicks the reset button. It resets all the variables to
   * their initial values
   * @param {any} event - any - This is the event that is triggered when the button is clicked.
   */
  onClickReset(event: any){
    this.displayableData = "";
    this.txtData = [];
    this.projectArray = [];
    this.finalTeams = [];
    this.displayableData="";
    console.log("Reset" +'\n');
    
  }

/**
 * The function takes the input file, parses it, and then displays the data in the text area
 * @param {any} event - any - this is the event that is triggered when the file is selected.
 */
  fileChanged(event: any){
    
    if(this.utility.inputFile!=null){ 
      this.utility.cvsFileParser(this.utility.inputFile).then((data: any) => {this.txtData = data;});
      console.log("this.txtData = "+this.txtData);

      this.txtData.forEach(element => {
        this.displayableData+=element + '\n';
      });

      this.projectArray = this.utility.arrayToProject(this.txtData);
      console.log("this.projectArray = "+this.projectArray);
    }

  }

/**
 * It takes an error object as an argument, and returns a new Error object with the error message
 * @param {any} error - any - The error object that was thrown
 * @returns The error message is being returned.
 */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // if error is client-side error
      errorMessage = `Error: ${error.message}`;
    } else {
      // if error is server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return new Error(errorMessage);
  }
}
