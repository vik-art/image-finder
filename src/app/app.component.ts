import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public form!: FormGroup;
  private page: number = 1;
  private searchQuery: string = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private observer: IntersectionObserver | undefined;

  @ViewChildren('imageItem', { read: ElementRef }) list:
    | QueryList<ElementRef>
    | undefined;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.initForm();
    this.setInterceptorObsetver()
  }

   ngAfterViewInit(): void {
     this.list?.changes.pipe(takeUntil(this.destroy$)).subscribe(d => {
       if (d.last) {
        this.observer?.observe(d.last.nativeElement)
      }
    })
  }

  private initForm() {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.required]),
    });
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.searchQuery !== this.form?.value.query) {
        this.page = 1;
        this.images = [];
      }
    });
  }

  public submit() {
    this.showLoading()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
    this.searchQuery = this.form.value.query;
    this.imageService
      .getImage(this.searchQuery, this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((images) => {
        this.images = images.hits;
        this.page++;
      });
    this.form.reset();
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
      threshold: 0.7
    }
    this.observer = new IntersectionObserver((entries) => {
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
