import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Folder } from '../../interfaces/folder.interface';
import { NotesService } from '../../notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.css'
})
export class FolderCardComponent {

  constructor(
    private notesService:NotesService,
    private router:Router){}

  @Input()
  public folder!:Folder;

  @Input()
  public isDeleted:boolean=false;

  deleteModal(folder:Folder){
    folder.deleted=true;
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
        this.notesService.deleteOrRestoreFolder(folder)
        Swal.fire("Nota enviada la papelera", "", "warning");
        this.router.navigate(['/carpetas'])
      }
    });
  }

  restore(folder:Folder){
    folder.deleted=false;
    this.notesService.deleteOrRestoreFolder(folder)
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
      }
    });
  }

}
