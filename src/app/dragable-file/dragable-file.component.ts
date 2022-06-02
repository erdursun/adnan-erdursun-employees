import { UtilityService } from './../utility.service';
import { Component, OnInit, HostListener, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-dragable-file',
  templateUrl: './dragable-file.component.html',
  styleUrls: ['./dragable-file.component.css']
})
export class DragableFileComponent implements OnInit {
  
  constructor(private utility:UtilityService) { 
  }
  @Output() fileChanged= new EventEmitter();
  error!: string;
  dragAreaClass!: string;
  draggedFiles: any;

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files, event);
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
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files,event);
    }
  }

  saveFiles(files: FileList, event: any) {
    
    if (files.length > 1) {
      this.error = "Only one file at time allow";
      return false;
    }else {
      this.utility.inputFile = files[0];
      //this.utility.txtFileToArray(this.utility.inputFile).then((data: any) => console.log(data));
      console.log(this.utility.fileToString(this.utility.inputFile));
      this.error = "";
      //console.log(files[0].size,files[0].name,files[0].type);
      this.draggedFiles = files;
      this.fileChanged.emit(event);
    }
    return true;
  }

}

