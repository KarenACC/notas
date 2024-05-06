import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../notes.service';
import { Folder } from '../../interfaces/folder.interface';

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
  }


}
 
