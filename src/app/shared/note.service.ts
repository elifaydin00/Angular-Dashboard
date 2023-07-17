import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

        this.storageListenSub = fromEvent(window, 'storage')
            .subscribe((event: Event) => {
        const storageEvent = event as StorageEvent;
        if (storageEvent.key === 'notes') {
        this.loadState();
        }
  });
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState()
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const notesIndex = this.notes.findIndex(b => b.id === id);
    if (notesIndex !== -1) {
        const note = this.notes[notesIndex];
        this.notes[notesIndex] = { ...note, ...updatedFields };
        this.saveState();
    }
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return

    this.notes.splice(noteIndex, 1)

    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
    const notesInStorage = localStorage.getItem('notes')
    if (!notesInStorage) return;

    const parsedNotes = JSON.parse(notesInStorage);

      this.notes.length = 0 // clear the notes array (while keeping the reference)
      this.notes.push(...parsedNotes)

    } catch (e) {
      console.log('There was an error retrieving the notes from localStorage')
      console.log(e)
    }
  }
}