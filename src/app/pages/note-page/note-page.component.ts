import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../notes.service';

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
  public isDeleted:boolean=false;
  public get folders(){
    return this.notesService.folders
  }
  
  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( (params)=>{
      this.notesService.getNoteById(params['id'])
      .subscribe(note => {
        if(!note){
          return this.router.navigateByUrl('');
        }
        this.note= note;
        return;
      })
    } )
  }

  delete(note:Note):void{
    note.deleted=true;
    this.notesService.deleteOrRestore(note);
  };

  addToFolder(folder:string, note:string){
    console.log('agregaste la nota', note, 'a', folder);
    
  };
}
