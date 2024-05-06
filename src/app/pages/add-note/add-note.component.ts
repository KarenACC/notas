import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NotesService } from '../../notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
})
export class AddNoteComponent implements AfterViewInit {

  constructor(private notesService:NotesService){}

   @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngAfterViewInit(){
    this.autosize.resizeToFitContent();
  };

  public note:Note={
    title: '',
    body: '',
    date: new Date,
    deleted: false,
    edited: false
  }

  public get folders(){
    return this.notesService.folders
  }

  addNote(){
    if(this.note.title!.length=== 0 || this.note.body!.length===0)  return;
    this.notesService.addNote(this.note)
    this.note={title: '', body:'', date:new Date(),deleted:false, edited:false}

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Nota guardada",
      showConfirmButton: false,
      timer: 1500 
    });
  }
}
