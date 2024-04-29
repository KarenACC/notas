import { Component } from '@angular/core';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrl: './deleted.component.css'
})
export class DeletedComponent {

  constructor(private notesService: NotesService){}

  get trash(){
    return this.notesService.trash
  }

  get foldersTrash(){
    return this.notesService.foldersTrash
  }

}
