import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';
import { ManageBookmarksComponent } from './manage-bookmarks/manage-bookmarks.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'bookmarks/add', component: AddBookmarkComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'notes', component: NotesComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
