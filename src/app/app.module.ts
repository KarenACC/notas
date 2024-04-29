import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';


import { FoldersListComponent } from './pages/folders-list/folders-list.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { AddFolderComponent } from './pages/add-folder/add-folder.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { NoteComponent } from './components/note-card/note.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { FolderCardComponent } from './components/folder-card/folder-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FoldersListComponent,
    NotesListComponent,
    AddNoteComponent,
    AddFolderComponent,
    DeletedComponent,
    NoteComponent,
    NotFoundComponent,
    FolderCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    FormsModule,
    MatCardModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
