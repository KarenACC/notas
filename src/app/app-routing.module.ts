import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { FoldersListComponent } from './pages/folders-list/folders-list.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { AddFolderComponent } from './pages/add-folder/add-folder.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FolderPageComponent } from './pages/folder-page/folder-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'notas'
  },
  {
    path:'notas',
    component:NotesListComponent
  },
  {
    path:'carpetas',
    component:FoldersListComponent,
  },
  {
    path:'crear-nota',
    component:AddNoteComponent
  },
  {
    path:'crear-carpeta',
    component:AddFolderComponent
  },
  {
    path:'papelera',
    component:DeletedComponent
  },
  {
    path:'carpetas/:id',
    component:FolderPageComponent
  },
  {
    path:'notas/:id',
    component:NotePageComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
