import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NotesService } from '../../notes.service';
import Swal from 'sweetalert2';
import { Folder } from '../../interfaces/folder.interface';

@Component({
  selector: 'app-note-card',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {

  constructor(private notesService: NotesService) {}

  @Input()
  public note!:Note;

  @Input()
  public isDeleted:boolean=false;
 
  get folders(){
    return this.notesService.folders
  }

  delete(note:Note):void{
    note.deleted=true;
    this.notesService.deleteOrRestore(note);
  }

  restore(note:Note){
    note.deleted=false;
    this.notesService.deleteOrRestore(note)
  }

  deleteForeverModal(note:Note){
    Swal.fire({
      title: "¿Eliminar permanentemente?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Eliminar`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        this.notesService.deleteForever(note)
        Swal.fire("Nota eliminada de la papelera", "", "warning");
      }
    });
  }

  addToFolder(folder:string, note:string){
    console.log('agregaste la nota', note, 'a', folder);
    
  };

}
