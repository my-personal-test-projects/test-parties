import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  imageFile: File | null = null;

  

  convertImageUrlToFile(imgageUrl: string) {
    var url = 'https://ap.greatfuturetechno.com' + imgageUrl;
    return this.httpClient
      .get(url, { responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  login(data: any) {
    return this.httpClient
      .post(`https://ap.greatfuturetechno.com/login/`, data)
      .pipe(catchError(this.handleError));
  }

  getallparty() {
    return this.httpClient
      .get(`https://ap.greatfuturetechno.com/party/`)
      .pipe(catchError(this.handleError));
  }

  getpartybyid(id: any) {
    return this.httpClient
      .get(`https://ap.greatfuturetechno.com/party/?id=` + id)
      .pipe(catchError(this.handleError));
  }

  create(data: any) {
    return this.httpClient
      .post(`https://ap.greatfuturetechno.com/party/`, data)
      .pipe(catchError(this.handleError));
  }

  update(id: any, data: any) {
    return this.httpClient
      .patch(`https://ap.greatfuturetechno.com/party/?id=` + id, data)
      .pipe(catchError(this.handleError));
  }

  delete(id: any) {
    return this.httpClient
      .delete(`https://ap.greatfuturetechno.com/party/?id=` + id)
      .pipe(catchError(this.handleError));
  }

  logout(data: any) {
    return this.httpClient
      .post(`https://ap.greatfuturetechno.com/logout/`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend Returned Code: ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
