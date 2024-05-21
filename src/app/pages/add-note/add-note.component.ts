import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NotesService } from '../../notes.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

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
    date: new Date(),
    deleted: false,
    edited: false,
    id: '',
  }

  public get folders(){
    return this.notesService.folders
  }

  public selectedFolderId?:string;

  addNote(){
    if(this.note.title!.length=== 0 || this.note.body!.length===0)  return;
    this.note.id = uuidv4();

    if(this.selectedFolderId){
      this.notesService.addNoteToFolder(this.selectedFolderId!, this.note).subscribe();
      
    } else {
      this.notesService.addNote(this.note);
    }

    this.note.title= '';
    this.note.body='';

    Swal.fire({ 
      position: "top-end",
      icon: "success",
      title: "Nota guardada",
      showConfirmButton: false,
      timer: 1500 
    });
  }

  selectFolder(folderId:string){
    this.selectedFolderId=folderId; 
   }

}


