import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note!: Note
  
  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    ) {}

    private null_note: Note = new Note('Default Title', 'Default Content');

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const noteId = paramMap.get('id')
      if (noteId) {
        this.note = this.noteService.getNote(noteId) ?? this.null_note;
      }
    })
  }

  onFormSubmit(form: NgForm) {
    this.noteService.updateNote(this.note.id, form.value)
    this.router.navigateByUrl("/notes")
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id)
    this.router.navigateByUrl("/notes")

  }

}
