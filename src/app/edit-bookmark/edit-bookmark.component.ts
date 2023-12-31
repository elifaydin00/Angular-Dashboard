import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark!: Bookmark
  
  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router) { }

    private null_bookmark: Bookmark = new Bookmark('Default Name', 'http://example.com');

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id')
      if (bookmarkId) {
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId) ?? this.null_bookmark;
      } 
    })
  }

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value

    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    })
  }

  delete() {
    this.bookmarkService.deleteBookmark(this.bookmark.id)
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  
}
