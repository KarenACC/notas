import { Component } from '@angular/core';
import { NotesService } from '../../notes.service';
import { Folder } from '../../interfaces/folder.interface';
import { v4 as uuidv4 } from 'uuid';

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
    notes: []
  }

  addFolder(){
    if(!this.folder.name) return;
    this.folder.id= uuidv4()
    this.notesService.addFolder(this.folder)
    this.folder.name='';
  }
}

