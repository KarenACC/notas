import { Injectable } from '@angular/core';
import { Note } from './interfaces/note.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { Folder } from './interfaces/folder.interface';

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
    this.clearTrash()

  }

  addNote(note:Note){
    const newNote:Note = {id:uuidv4(), ...note, date:new Date()}
    this._notes.unshift(newNote)
    this.saveToLocalStorage('notas', this._notes)
  };

  deleteOrRestore(note:Note){
    if(note.deleted===true) {      
      let id= note.id;
      let copyNotesArray= this._notes.filter(note => note.id !== id)
      this._notes = copyNotesArray;
      
      this._trash.unshift(note)
      
      this.saveToLocalStorage('eliminadas', this._trash);
      this.saveToLocalStorage('notas', this._notes);

      Swal.fire('La nota ha sido movida a la papelera.');

    } else{
      
      let id = note.id;
      let copyDeletedArray= this._trash.filter(note => note.id !== id)
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
    this._trash= this.trash.filter(note => note.id !== id)
    this.saveToLocalStorage('eliminadas', this._trash);
  }
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
  }

  

  public saveToLocalStorage(key: string, notes: any[]): void {
    localStorage.setItem(key, JSON.stringify(notes));
  }

  public getFromLocalStorage(key: string): any[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

}
