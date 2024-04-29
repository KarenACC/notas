import { Component } from '@angular/core';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrl: './folders-list.component.css'
})
export class FoldersListComponent {

  constructor(private notesService:NotesService){}
  get folders(){
    return this.notesService.folders
  }
}
