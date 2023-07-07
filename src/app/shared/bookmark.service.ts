import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = []

  storageListenSub: Subscription
  
  constructor() {
    this.loadState()

        this.storageListenSub = fromEvent(window, 'storage')
            .subscribe((event: Event) => {
        const storageEvent = event as StorageEvent;
        if (storageEvent.key === 'bookmarks') {
        this.loadState();
        }
  });
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }
  
  getBookmarks() {
    return this.bookmarks
  }

  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)

    this.saveState()
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
    if (bookmarkIndex !== -1) {
        const bookmark = this.bookmarks[bookmarkIndex];
        this.bookmarks[bookmarkIndex] = { ...bookmark, ...updatedFields };
        this.saveState();
    }
  }
  

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
    if (bookmarkIndex == -1) return
    this.bookmarks.splice(bookmarkIndex, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
  }

  loadState() {
    try {
      const bookmarksFromStorage = localStorage.getItem('bookmarks');
  
      if (bookmarksFromStorage !== null) {
        const bookmarksInStorage = JSON.parse(bookmarksFromStorage, (key, value) => {
          if (key === 'url') return new URL(value);
          return value;
        });
  
        this.bookmarks.length = 0; // clear the bookmarks array (while keeping the reference)
        this.bookmarks.push(...bookmarksInStorage);
      }
    } catch (e) {
      console.log('There was an error retrieving the bookmarks from localStorage');
      console.log(e);
    }
  }

}