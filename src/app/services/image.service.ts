import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Params } from '../common/interfaces/params.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) {}

  getImage(query: Params): Observable<any> {
    const params = new HttpParams()
      .set('page', query.page)
      .set('q', query.searchQuery)
      .set('key', environment.key)
      .set('image_type', 'photo&orientation=horizontal')
      .set('per_page', 12)
    return this.http.get(environment.baseURL, { params: params })
      .pipe(
        tap((response: any) => {
          return response
      })
    )
  }
}
