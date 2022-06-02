
export class ProjectEmployee {
    constructor(public employeeID: number, public startDate: Date, public endDate: Date){
        
    }

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