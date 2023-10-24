import { Inject, Injectable,Injector } from '@angular/core';
import{HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
constructor(@Inject(Injector) private injector:Injector){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authService=this.injector.get(AuthService)
  let tokenizedReq = req.clone({
          setHeaders:{
            Authorization:`Bearer ${authService.getToken()}`
          }
        })
        return next.handle(tokenizedReq);

}
}
