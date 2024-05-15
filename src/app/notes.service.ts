import { Injectable } from '@angular/core';
import { Note } from './interfaces/note.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { Folder } from './interfaces/folder.interface';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private _notes:Note[]=[];
  private _trash:Note[] = [];

  private _folders:Folder[] =[];
  private _foldersTrash:Folder[]= [];

  public get notes(){
    return [...this._notes]
  }
  public get trash(){
    return [...this._trash]
  }

  public get folders(){
    return [...this._folders]
  }

  public get foldersTrash(){
    return [...this._foldersTrash]
  }

  constructor() { 
    this._notes = this.getFromLocalStorage('notas') || [];
    this._trash = this.getFromLocalStorage('eliminadas') || [];
    this._folders = this.getFromLocalStorage('carpetas') || [];
    this._foldersTrash = this.getFromLocalStorage ('carpetas_eliminadas') || [];
    this.clearTrash();
  }

  addNote(note:Note){
    const newNote = { ...note}
    this._notes.unshift(newNote)
    this.saveToLocalStorage('notas', this._notes)
  };


  deleteOrRestore(note: Note): void {
    if (note.deleted === true) {
      let id = note.id;
      let copyNotesArray = this._notes.filter(note => note.id !== id);
      this._notes = copyNotesArray;
      this._trash.unshift(note);
      this.saveToLocalStorage('eliminadas', this._trash);
      this.saveToLocalStorage('notas', this._notes);
      Swal.fire('La nota ha sido movida a la papelera.');
      
      // Eliminar la nota de la carpeta si está dentro de una
      for (const folder of this._folders) {
        if (folder.notes) {
          folder.notes = folder.notes.filter(note => note.id !== id);
        }
      }
      this.saveToLocalStorage('carpetas', this._folders);
    } else {
      let id = note.id;
      let copyDeletedArray = this._trash.filter(note => note.id !== id);
      this._trash = copyDeletedArray;
      this._notes.unshift(note);
      this.saveToLocalStorage('eliminadas', this._trash);
      this.saveToLocalStorage('notas', this._notes);
      Swal.fire('Recuperaste esta nota.');
    }
  }
  

  clearTrash(): void {
    if(this._trash.length===0 && this._foldersTrash.length=== 0) return;
    const limiteDias = 15;
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - limiteDias);
  
    this._trash = this._trash.filter(note => {
      if (note.date) {
        const fechaEliminacion = new Date(note.date);
        return fechaEliminacion >= fechaLimite;
      } else {
        return false; 
      }
    });

    this._foldersTrash = this._foldersTrash.filter(folder => {
      if (folder.date) {
        const fechaEliminacion = new Date(folder.date);
        return fechaEliminacion >= fechaLimite;
      } else {
        return false; 
      }
    });
  
    this.saveToLocalStorage('eliminadas', this._trash);
    this.saveToLocalStorage('carpetas_eliminadas', this._foldersTrash);
  }

  deleteForever(note:Note){
    let id= note.id
    this._trash= this._trash.filter(note => note.id !== id)
    this.saveToLocalStorage('eliminadas', this._trash);
  }

  getNoteById(id:string):Observable<Note | undefined>{
    let note = this._notes.find(note => note.id === id);
    let deletedNote = this._trash.find(note => note.id === id);
    if (note || deletedNote){
      return of (note || deletedNote);
    }

    for (const folder of this._folders){
      if (folder.notes){
        note = folder.notes.find(note => note.id === id);
        if(note){
          return of(note)
        }
      }
    }

    for (const folder of this._foldersTrash){
      if(folder.notes){
        note= folder.notes.find(note => note.id === id);
        if(note){
          return of (note);
        }
      }
    }

    return of(undefined)
  };

  addNoteToFolder(folderId: string, note: Note): Observable<Folder> {
    return this.getFolderById(folderId).pipe(
      switchMap(folder => {
        if (folder) {
          if (!folder.notes) {
            folder.notes = [];
          }
  
          // Eliminar la nota de la carpeta actual
          const noteId = note.id;
          this._notes = this._notes.filter(n => n.id !== noteId);
          for (const f of this._folders) {
            if (f.notes) {
              f.notes = f.notes.filter(n => n.id !== noteId);
            }
          }
  
          // Agregar la nota a la nueva carpeta
          const addedNote = { ...note };
          folder.notes.unshift(addedNote);

          this.saveToLocalStorage('notas', this._notes);
          this.saveToLocalStorage('carpetas', this._folders);
  
          return of(folder);
        } else {
          return throwError("La carpeta no existe.");
        }
      })
    );
  };
  

  editNote(note:Note):void{
      let id= note.id;
      let noteToEdit = this._notes.find(element => element.id === id);
      if(noteToEdit){
        noteToEdit = note;
        this.saveToLocalStorage('notas', this._notes);
        return;
      }

      for (const folder of this._folders) {
        if (folder.notes) {
          noteToEdit = folder.notes.find(element => element.id === id);
          if(noteToEdit){
            noteToEdit = note;
            this.saveToLocalStorage('carpetas', this._folders)
            return;
          }
        }
      }
  };
  
  

  // 
  //
  //  
  // 
  // Aquí comienza la lógica para las carpetas
  // 
  // 
  // 
  // 


  addFolder(folder:Folder):void{
    const newFolder = {...folder}
    this._folders.unshift(newFolder)
    this.saveToLocalStorage('carpetas', this._folders)
  }

  deleteOrRestoreFolder(folder:Folder){
    if(folder.deleted===true) {      
      let id= folder.id;
      let copyFoldersArray= this._folders.filter(note => note.id !== id)
      this._folders = copyFoldersArray;
      
      this._foldersTrash.unshift(folder)
      console.log('tus carpetas eliminadas', this._foldersTrash);
      
      
      this.saveToLocalStorage('carpetas_eliminadas', this._foldersTrash);
      this.saveToLocalStorage('carpetas', this._folders);

      Swal.fire('La carpeta ha sido movida a la papelera.');

    } else{
      
      let id = folder.id;
      let copyDeletedArray= this._foldersTrash.filter(note => note.id !== id)
      this._foldersTrash = copyDeletedArray;
      this._folders.unshift(folder);
      this.saveToLocalStorage('carpetas_eliminadas', this._foldersTrash);
      this.saveToLocalStorage('carpetas', this._folders);
      Swal.fire('Recuperaste esta carpeta.');
    }
  }

  deleteForeverFolder(folder:Folder){
    let id= folder.id
    this._foldersTrash= this._foldersTrash.filter(folder => folder.id !== id)
    this.saveToLocalStorage('carpetas_eliminadas', this._foldersTrash);
  };

  getFolderById(id:string):Observable<Folder | undefined>{
    const folder = this._folders.find(folder => folder.id === id);
    const deletedFolder = this._foldersTrash.find(folder => folder.id === id);
    if( folder || deletedFolder){
       return of (folder || deletedFolder);
    }
    return of (undefined)
  };

  editFolder(folder:Folder){
    let id = folder.id;
    let folderToEdit = this.folders.find(element => element.id === id);
    if(folderToEdit){
      folderToEdit = folder;
      this.saveToLocalStorage('carpetas', this._folders);
      return;
    }
  }

  public saveToLocalStorage(key: string, notes: any[]): void {
    localStorage.setItem(key, JSON.stringify(notes));
  }

  public getFromLocalStorage(key: string): any[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

}
