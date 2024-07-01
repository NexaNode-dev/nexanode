import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJobOffer, IQueryParams } from '@nexanode/domain-interfaces';
import { convertToHttpParams } from '@nexanode/frontend-http-params-util';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  private apiUrl = 'api/job-offers';

  constructor(private readonly http: HttpClient) {}

  getJobOffers(query?: IQueryParams<IJobOffer>) {
    const queryParams = convertToHttpParams(query || {});
    return this.http.get<IJobOffer[]>(this.apiUrl, { params: queryParams });
  }

  getJobOffer(id: string) {
    return this.http.get<IJobOffer>(`${this.apiUrl}/${id}`);
  }

  createJobOffer(jobOffer: Partial<IJobOffer>) {
    return this.http.post<IJobOffer>(this.apiUrl, jobOffer);
  }

  updateJobOffer(id: string, jobOffer: Partial<IJobOffer>) {
    return this.http.put<IJobOffer>(`${this.apiUrl}/${id}`, jobOffer);
  }

  deleteJobOffer(id: string) {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
