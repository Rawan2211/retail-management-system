import { Injectable,Injector } from '@angular/core';
import{HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { LoginRepository } from 'src/app/domain/login/login.repository';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
constructor(private injector:Injector,private router:Router){}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5ODA0OTI2MSwiZXhwIjoxNjk4MTM1NjYxfQ.FpPU0oG_zvR1PXILaxGZCmlJCIXXkm__uyG2zuPKSx4";
  let tokenizedReq = req.clone({
          setHeaders:{
            Authorization:`Bearer ${token}`
          }
        })
        return next.handle(tokenizedReq);


}
// private handleAuthError(err: HttpErrorResponse): Observable<any> {
//   if (err.status === 401) {
//       this.router.navigateByUrl(`/login`);
//   }
//   return throwError(err);
// }
// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   let authService=this.injector.get(LoginComponent)
//     let tokenizedReq = req.clone({
//       setHeaders:{
//         Authorization:`Bearer  ${authService.getToken()}`
//       }
//     })
//     return next.handle(tokenizedReq).pipe(catchError(x=> this.handleAuthError(x)));
// }
}
