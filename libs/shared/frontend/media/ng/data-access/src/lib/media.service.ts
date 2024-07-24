import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMedia, IQueryParams } from '@nexanode/domain-interfaces';
import { convertToHttpParams } from '@nexanode/frontend-http-params-util';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private apiUrl = '/api/media';

  constructor(private readonly http: HttpClient) {}

  getMedia(query?: IQueryParams<IMedia>) {
    const queryParams = convertToHttpParams(query || {});
    return this.http.get<IMedia[]>(this.apiUrl, { params: queryParams });
  }

  getMediaItem(id: string) {
    return this.http.get<IMedia>(`${this.apiUrl}/${id}`);
  }

  createMedia(media: Partial<IMedia>) {
    return this.http.post<IMedia>(this.apiUrl, media);
  }

  updateMedia(id: string, media: Partial<IMedia>) {
    return this.http.patch<IMedia>(`${this.apiUrl}/${id}`, media);
  }

  deleteMedia(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
