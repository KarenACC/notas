import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Folder } from '../../interfaces/folder.interface';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.css'
})
export class FolderCardComponent {

  constructor(private notesService:NotesService){}

  @Input()
  public name:string='';

  @Input()
  public date:Date = new Date;

  @Input()
  public folder!:Folder;

  @Input()
  public isDeleted:boolean=false;

  @Input()
  public notes!:number;

  delete(folder:Folder):void{
    folder.deleted=true;
    this.notesService.deleteOrRestoreFolder(folder);
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
