import { UtilityService } from './../utility.service';
import { Component, OnInit, HostListener, Output, EventEmitter, ErrorHandler } from "@angular/core";

/* It's a component that allows you to drag and drop a file into a drop area */
@Component({
  selector: 'app-dragable-file',
  templateUrl: './dragable-file.component.html',
  styleUrls: ['./dragable-file.component.css']
})
export class DragableFileComponent implements OnInit, ErrorHandler {
  
  /**
   * Event emitted when a file is dragged and dropped
   * @param {UtilityService} utility - This is the name of the service that we want to inject.
   */
  constructor(private utility:UtilityService) { 
  }

  @Output() fileChanged= new EventEmitter();
  @Output() fileDropped= new EventEmitter();
  error!: string;
  dragAreaClass!: string;
  draggedFiles: any;

  /**
   * It takes the event object, checks if there are files attached to it, and if there are, it saves
   * it to the utility.inputFile and emits the event
   * @param {any} event - any - The event that is triggered when a file is selected.
   */
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      let files: FileList = event.target.files;
      this.saveFiles(files,event);
      this.fileChanged.emit(event);
    }else{
      this.error = "No files selected";
    }
  }

  ngOnInit() {
    this.dragAreaClass = "dragarea";
  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  /* It's a function that is triggered when a file is dropped. */
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files,event);
      this.fileDropped.emit(event);
    }else{
      this.error = "No files selected";
    }
  }

  /**
   * It takes a FileList and an event as parameters, and returns true if the file list contains only
   * one file, and false otherwise
   * @param {FileList} files - FileList - The list of files that were dragged and dropped.
   * @param {any} event - The event object that triggered the file upload.
   * @returns A boolean value.
   */
  saveFiles(files: FileList, event: any) {
    
    if (files.length > 1) {
      this.error = "Only one file at time allow";
      return false;
    }else {
      this.utility.inputFile = files[0];
      this.error = "";
      this.draggedFiles = files;      
    }
    return true;
  }

  /**
   * It takes an error object as a parameter, checks if the error is a client-side error or a
   * server-side error, and returns an error message
   * @param {any} error - any - The error object that was thrown.
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

