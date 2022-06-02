import { Component } from '@angular/core';
import { Project } from './entities/Project';
import { Team } from './entities/Team';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  title = 'TASK : Pair of employees who have worked together';
  txtData: string[] = [];
  displayableData: string = "";
  projectArray: Array<Project> = [];
  finalTeams: Array<Team> = [];


  constructor(private utility: UtilityService) {
    
  }


  mergeTeamsOfProjects(projectArray: Array<Project>){
    for(let project of projectArray){
      this.finalTeams.push(...new Set([...project.getTeams()]));
    }
  }

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

  

  onClick(event: any){
    this.txtData.forEach(element => {
      this.displayableData+=element + '\n';
    });

    this.projectArray.forEach(element => {
      element.calculatePairings();
    });

    this.mergeTeams(this.projectArray);

    console.log("Employee#1, Employee#2, CommonProjectID, DaysWorked" +'\n');
    this.finalTeams.forEach(team => {
      console.log(team.displayTeam());
    });

    
  }


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

}
