import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NotesService } from '../../notes.service';
import Swal from 'sweetalert2';
import { Folder } from '../../interfaces/folder.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-card',
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  constructor(
    private notesService: NotesService,
    private router:Router,
  ) {}
  
  
  ngOnInit(): void {
    this._folders = this.notesService.folders;
  }
  
  @Input()
  public note!:Note;
  
  @Input()
  public isDeleted:boolean=false;
  
  get folders(){
    return this.notesService.folders
  }
  private _folders: Folder[] = [];


  deleteModal(note:Note){
    note.deleted=true;
    Swal.fire({
      title: "¿Enviar a papelera?",
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
        this.notesService.deleteOrRestore(note)
        Swal.fire("Nota enviada la papelera", "", "warning");
        this.router.navigate(['/notas'])
      }
    });
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

  addNoteToFolder(folder:Folder, note:Note){
    console.log('agregaste la nota a la carpeta', folder.name);
    this.notesService.addNoteToFolder(folder.id, note).subscribe()
  }


  
  

}
