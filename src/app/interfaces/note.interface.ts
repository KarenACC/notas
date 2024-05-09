export interface Note {
    id:string,
    title:string,
    body:string,
    folderId?:string,
    date:Date,
    deleted:boolean,
    edited:boolean
}