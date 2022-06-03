import { Injectable } from '@angular/core';
import { Project } from './entities/Project';
import { ProjectEmployee } from './entities/ProjectEmployee';
import { catchError } from 'rxjs';

/* This class is a utiliy service that contains the commonly required medthod and variables*/
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /* The source file that contains the data */
  inputFile!: File;
  constructor() { 
  }

/**
 * It takes a file, reads it, and returns an array of strings
 * @param {File} file - File - the file that you want to parse
 * @returns A promise that resolves to an array of strings.
 */
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

/**
 * It takes an array of strings, each string containing 4 comma separated values, and returns an array
 * of Project objects, each Project object containing an array of ProjectEmployee objects
 * @param {string[]} array - string[] - the array of strings to be converted to an array of Project
 * objects
 * @returns An array of Project objects.
 */
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

/**
 * It returns true if the first character of the string is a number
 * @param {string} str - The string to be tested.
 * @returns function isFirstCharIsNumber(str) {
 *     return /^\d/.test(str);
 *   }
 */
  isFirstCharIsNumber(str: string) {
    return /^\d/.test(str);
  }

/**
 * It returns true if the first character of the string is a letter, and false otherwise
 * @param {string} str - The string to be tested.
 * @returns isFirstCharIsAlpha(str: string) {
 *     return /^[a-zA-Z]/.test(str);
 *   }
 */
  isFirstCharIsAlpha(str: string) {
    return /^[a-zA-Z]/.test(str);
  }

}
