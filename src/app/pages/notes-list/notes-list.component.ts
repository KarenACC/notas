import { Component } from '@angular/core';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {

  constructor (private notesService: NotesService) {}

  get list(){
    return this.notesService.notes
  }
}
