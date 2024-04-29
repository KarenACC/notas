import { Note } from "./note.interface";

export interface Folder {
    name:string,
    id:string,
    notes?:Note[],
    date: Date,
    deleted:boolean,
    edited:boolean
}