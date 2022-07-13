import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  public getImage(searchQuery: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('q', searchQuery)
      .set('key', environment.key)
      .set('image_type', 'photo&orientation=horizontal')
      .set('per_page', 12)
    return this.http.get(environment.baseURL, { params: params })
  }
}
