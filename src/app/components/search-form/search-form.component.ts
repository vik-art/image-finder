import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() sentData = new EventEmitter();

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      query: new FormControl('', [Validators.required]),
    });
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {});
  }

  public takeData() {
    this.sentData.emit(this.form.value);
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
