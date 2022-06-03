
/* The ProjectEmployee class is a class that represents an employee working on a project */
export class ProjectEmployee {
    /**
     * The constructor function is a special function that is called when an object is created
     * @param {number} employeeID - number
     * @param {Date} startDate - The date the employee started working at the company.
     * @param {Date} endDate - Date - The end date of the employee's vacation.
     */
    constructor(public employeeID: number, public startDate: Date, public endDate: Date){
        
    }

    /**
     * Calculates the pairing times according to other employee's start date and end date
     * @param {ProjectEmployee} otherEmployee - ProjectEmployee - the other employee that we are
     * comparing this employee to
     * @returns The number of days that the two employees worked together.
     */
    calculatePairingTime(otherEmployee:ProjectEmployee){
        let result:number = 0;

        if(this.startDate <= otherEmployee.startDate && this.endDate >= otherEmployee.endDate){
            result = otherEmployee.endDate.getTime() - otherEmployee.startDate.getTime();
        }else if(this.startDate >= otherEmployee.startDate && this.endDate <= otherEmployee.endDate){
            result = this.endDate.getTime() - this.startDate.getTime();
        }else if(this.startDate <= otherEmployee.startDate && this.endDate <= otherEmployee.endDate){
            result = otherEmployee.startDate.getTime() - this.endDate.getTime();
        }else if(this.startDate >= otherEmployee.startDate && this.endDate >= otherEmployee.endDate){
            result = this.startDate.getTime() - otherEmployee.endDate.getTime();
        }
        return Math.floor(result/ (1000 * 3600 * 24));
    }

}