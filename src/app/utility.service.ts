import { Injectable } from '@angular/core';
import { Project } from './entities/Project';
import { ProjectEmployee } from './entities/ProjectEmployee';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  inputFile!: File;
  constructor() { 
  }

  cvsFileParser(file: File){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const lines = e.target.result.split('\n');
        const result:String[] = [];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].length > 0 && this.isFirstCharIsNumber(lines[i])) {
            result.push(lines[i]);
          }
        }
        resolve(result);
      };
      reader.readAsText(file);
    });
  }

  arrayToProject(array: string[]){
    let result: Array<Project> = new Array();
    for (let i = 0; i < array.length; i++) {
      // datum content : EmpID, ProjectID, DateFrom, DateTo
      let datum = array[i].split(',');
      if(datum.length == 4){
        let projectEmployee:ProjectEmployee = new ProjectEmployee(+datum[0], new Date(datum[2]), (datum[3].toLocaleUpperCase()=="NULL") ? new Date() : new Date(datum[3]));
        let project:Project = new Project(+datum[1]);
        let tempPrj = result.find(x => x.projectID == project.projectID);
        if(tempPrj==null || tempPrj==undefined) { 
          project.addEmployee(projectEmployee);
          result.push(project);
        }else{
          tempPrj.addEmployee(projectEmployee);
        }
      }else{
        console.error("Invalid data - arrayToProject: " + datum);
      }
    }
    return result;
    
  }

  fileToArray(file: File, spliter = ",") {
    let reader = new FileReader();
    let arr: String[] = [];
    reader.onload = (e: any) => {
      let str = e.target.result;
      arr = str.split(spliter);
    };
    reader.readAsText(file);
    return arr;
  } 

  fileToStr(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        resolve(e.target.result);
      };
      reader.readAsText(file);
    });
  }

  fileToString(file: File) {
    let reader = new FileReader();
    let str = "";
    reader.onload = (e: any) => {
      str = e.target.result;
    };
    reader.readAsText(file);
    return str;
  }


  isFirstCharIsNumber(str: string) {
    return /^\d/.test(str);
  }

  isFirstCharIsAlpha(str: string) {
    return /^[a-zA-Z]/.test(str);
  }

 
}
