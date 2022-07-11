import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, of, tap } from 'rxjs';
import { Image } from './common/interfaces/image.interface';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private imageService: ImageService) {}

  form!: FormGroup;
  page: number = 1;
  searchQuery: string = '';
  images: Array<Image> = [];

  public load: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.required]),
    });
    this.form.valueChanges.subscribe(() => {
      if (this.searchQuery !== this.form?.value.query) {
        this.page = 1;
        this.images = [];
      }
      this.searchQuery = this.form.value.query;
    });
  }

  submit() {
    this.showLoading().subscribe(() => {})
    const queryParams = {
      page: this.page,
      searchQuery: this.searchQuery,
    };
    this.imageService.getImage(queryParams).subscribe((images) => {
      this.images = images.hits;
      this.page++;
    });
  }

  loadMore() {
    const queryParams = {
      page: this.page,
      searchQuery: this.searchQuery,
    };
    this.imageService.getImage(queryParams).subscribe((images) => {
      this.showLoading().subscribe(() => { });
      this.images = [...this.images, ...images.hits];
      this.page++;
    });
  }

  showLoading() {
    return of(this.load = true).pipe(
      delay(3000),
      tap(() => this.load = false)
    )
  }
}
