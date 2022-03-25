import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Image } from './common/interfaces/image.interface';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private imageService: ImageService,
  ){}

  form!: FormGroup;
  page: number = 1;
  searchQuery: string = "";
  images: Array<Image> = [];
  unSubscriber!: Subscription;
  secondUnSubscriber!: Subscription;

  public load: boolean = false;

  ngOnInit(): void {
    this.initForm()
  }
  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe()
  }

  initForm() {
    this.form = new FormGroup({
      query: new FormControl("", [Validators.required])
    })
    this.form.valueChanges.subscribe(() => {
      if (this.searchQuery !== this.form.value.query) {
        this.page = 1;
        this.images = [];
      } 
        this.searchQuery = this.form.value.query;
    })
  }
  
  submit() {
    this.showLoading()
      const queryParams = {
      page: this.page,
      searchQuery: this.searchQuery
    }
    this.unSubscriber = this.imageService.getImage(queryParams)
      .subscribe((images) => {
        this.images = images.hits;
        this.page++
      })
  }


  loadMore() {
   const queryParams = {
      page: this.page,
      searchQuery: this.searchQuery
   }
    this.secondUnSubscriber = this.imageService.getImage(queryParams)
      .subscribe((images) => {
        this.images = [...this.images, ...images.hits];
        this.page++
    })
  }

  showLoading() {
    this.load = true;

    setTimeout(() => {
      this.load = false
    }, 5000)
  }

}
