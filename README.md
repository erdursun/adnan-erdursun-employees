# About The Project

This project has been developed for an assigment example for interviews:


# The Task :
Pair of employees who have worked together

Create an application that identifies the pair of employees who have worked together on common projects for the longest period of time.

Input data:
A CSV file with data in the following format:
 ```EmpID, ProjectID, DateFrom, DateTo```

Example data: 
   ```
      143, 12, 2013-11-01, 2014-01-05
      218, 10, 2012-05-16, NULL
      143, 10, 2009-01-01, 2011-04-27
      ...
   ```
Output format:
 ```EmployeeID_1, EmployeeID_2, ProjectID, TotalDays```

Sample output: 
```
      143, 143, 218, 8
      ...
```

# Assignment Guide
* The input data must be loaded to the program from a CSV file
* DateTo can accept value "NULL“ (this is equal to "Today“).
* The program have to be started without the need to do any code changes, after “checkout” on the code and import in IDE with Node.js platform


# Project Details

The program is a one page, standalone Angular application. 
* Reading data from a text file which is draged or choosed from your computer.
 ```If it is not work the firs time you upload, please try again. :)```. 
* Calculates longest overlap and display the pair ( the team ) which has longest total overlap on each projects for the longest time.

## Getting Started
### Application is supposed to be run over Node.js platform

* Clone repository: using client for the Git version control system. [TortoiseGit](https://tortoisegit.org/)
* Import the project to your IDE
* Install/Setup the Node.js for executing ```ng serve``` command in the project ```root```directory
* Use [Adroid 13](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296)
* The text file with the data have to be prepared before upload to the program in the following format:
 ```EmpID, ProjectID, DateFrom, DateTo```

#### Repository URL
```
https://github.com/erdursun/adnan-erdursun-employees.git
```
## Technologies

* Angular - [Angular 13](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296)
* Node.js - [Node.js 16.15.1](https://nodejs.org/en/)

## IDE 

* Visual Studio Code - [VS Code](https://code.visualstudio.com/)

## Version

1.3-SNAPSHOT

## Author

**Adnan Erdursun** 
* [GitHub](https://github.com/erdursun)
* [LinkedIn](https://www.linkedin.com/in/erdursun/)
* [Twitter](https://www.twitter.com/AdnanErdursun/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details