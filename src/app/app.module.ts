import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxLoadingXModule } from 'ngx-loading-x';
import { ngxLoadingXConfig } from './libs/loadingConfig';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [AppComponent, SearchFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
