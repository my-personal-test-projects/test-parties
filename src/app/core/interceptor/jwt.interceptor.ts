import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  //constructor(private userStorageService: UserStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = sessionStorage.getItem("token");
    if (token != null && token != undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token  ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
