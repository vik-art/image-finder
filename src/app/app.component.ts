import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { delay, of, Subject, takeUntil, tap } from 'rxjs';

import { Image } from './common/interfaces/image.interface';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public images: Array<Image> = [];
  public load: boolean = false;
  private page: number = 1;
  private searchQuery: string = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private observer: IntersectionObserver | undefined;

  @ViewChildren('imageItem', { read: ElementRef }) list:
    | QueryList<ElementRef>
    | undefined;
    
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.setInterceptorObsetver()
  }

   ngAfterViewInit(): void {
     this.list?.changes.pipe(takeUntil(this.destroy$)).subscribe(d => {
       if (d.last) {
        this.observer?.observe(d.last.nativeElement)
      }
     })
  }  

  public submit(e: { [key: string]: string }) {
    this.searchQuery = e['query'];
    this.showLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
   
    this.imageService
      .getImage(this.searchQuery, this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((images) => {
        this.images = images.hits;
        this.page++;
      });
    
  }

  private showLoading() {
    return of((this.load = true)).pipe(
      delay(3000),
      tap(() => (this.load = false))
    );
  }

  private setInterceptorObsetver(): void {
    let options = {
      root: null,
      threshold: 0.5
    }
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.imageService.getImage(this.searchQuery, this.page).pipe(takeUntil(this.destroy$)).subscribe(res => {
          this.images = [...this.images, ...res.hits];
          this.page++;
        })
      }
    }, options)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
