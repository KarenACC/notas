import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../notes.service';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrl: './note-page.component.css'
})
export class NotePageComponent implements OnInit{

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private notesService:NotesService
  ){}
  
  public note!:Note;
  public selectedFolderId?:string;
  public isDeleted:boolean=false;
  public get folders(){ 
    return this.notesService.folders
  }

  // @ViewChild('titleInput') titleInput!: NgModel;
  // @ViewChild('bodyInput') bodyInput!: NgModel;
   
  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( (params)=>{
      this.notesService.getNoteById(params['id'])
      .subscribe(note => {
        if(!note){
          return this.router.navigateByUrl('');
        }
        this.note= note;
        // this.resetInputPristine();
        return;
      })
    } )
  }; 

  deleteModal(note:Note){
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
        note.deleted=true;
        this.notesService.deleteOrRestore(note)
        Swal.fire("Nota enviada la papelera", "", "warning");
        this.router.navigate(['/notas'])
      }
    });
  }

  selectFolder(folderId:string){
    this.selectedFolderId=folderId;
    console.log('seleccionaste la carpeta', folderId);
   };

  //  resetInputPristine(): void {
  //   if (this.titleInput) {
  //     this.titleInput.control.markAsPristine();
  //   }
  //   if (this.bodyInput) {
  //     this.bodyInput.control.markAsPristine();
  //   }
  // };

  updateNote(){
    if(this.note.title!.length=== 0 || this.note.body!.length===0)  return;

    this.note.edited=true;
    if(this.selectedFolderId !== this.note.folderId){
      
      this.notesService.addNoteToFolder(this.selectedFolderId!, this.note).subscribe( ()=> {
        this.notesService.editNote(this.note);
        this.showSuccessAlert();
      })
    } else{
      
      this.notesService.editNote(this.note);
      this.showSuccessAlert();
      
    }
   };

   showSuccessAlert(){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Nota guardada",
      showConfirmButton: false,
      timer: 1500 
    });
   };

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
        this.router.navigate(['/papelera'])
      }
    });
  }
}
