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
    
  };

  deleteModal(folder:Folder){
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
        folder.deleted=true;
        this.notesService.deleteOrRestoreFolder(folder)
        Swal.fire("Carpeta enviada la papelera", "", "warning");
        this.router.navigate(['/carpetas'])
      }
    });
  }

  deleteForeverModal(folder:Folder){
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
        this.notesService.deleteForeverFolder(folder)
        Swal.fire("Carpeta eliminada de la papelera", "", "warning");
        this.router.navigate(['/papelera'])
      }
    });
  }


}
 
