import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageListComponent } from './components/image-list/image-list.component';
import { NgxLoadingXModule } from 'ngx-loading-x';
import { ngxLoadingXConfig } from './libs/loadingConfig';
import { ImageItemComponent } from './components/image-item/image-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    ImageItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
