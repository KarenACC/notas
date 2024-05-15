import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../notes.service';
import { Folder } from '../../interfaces/folder.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrl: './folder-page.component.css'
})
export class FolderPageComponent implements OnInit{

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private notesService:NotesService
  ){}

  public folder!:Folder;

   ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( (params)=>{
      this.notesService.getFolderById(params['id'])
      .subscribe(folder => {
        if(!folder){
          return this.router.navigateByUrl('');
        }
        this.folder= folder;
        return;
      })
    } )
  };

  updateFolder(){
    if(this.folder.name.length ===0) return;

    this.notesService.editFolder(this.folder)
    console.log('editaste la carpeta');
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Carpeta guardada",
      showConfirmButton: false,
      timer: 1500 
    });
    
  }


  // updateNote(){
  //   if(this.note.title!.length=== 0 || this.note.body!.length===0)  return;

  //   this.note.edited=true;
  //   if(this.selectedFolderId !== this.note.folderId){
      
  //     this.notesService.addNoteToFolder(this.selectedFolderId!, this.note).subscribe( ()=> {
  //       this.notesService.editNote(this.note);
  //       this.showSuccessAlert();
  //     })
  //   } else{
      
  //     this.notesService.editNote(this.note);
  //     this.showSuccessAlert();
      
  //   }
  //  };


}
 
