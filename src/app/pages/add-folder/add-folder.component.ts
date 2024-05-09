import { Component } from '@angular/core';
import { NotesService } from '../../notes.service';
import { Folder } from '../../interfaces/folder.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.css'
})
export class AddFolderComponent {

  constructor(private notesService:NotesService){}

  folder:Folder={
    name: '',
    id: '',
    date: new Date(),
    deleted: false,
    edited: false,
  }

  addFolder(){
    if(!this.folder.name) return;
    this.folder.id= uuidv4()
    this.notesService.addFolder(this.folder) 
    this.folder.name='';

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Carpeta creada",
      showConfirmButton: false,
      timer: 1500 
    });
  }
}

