import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import { Response } from './../models/response';

@Injectable({
  providedIn: 'root',
})
export abstract class ResourceService<T> {
  abstract getResourceUrl(): string;
  protected readonly APIUrl =
  SettingsService.configurationEnvironment.api.baseUrl +
  this.getResourceUrl();

protected constructor(protected httpClient: HttpClient) {}

toServerModel(entity:T) :any{
  return entity;
}

fromServerModel(json:any):T{
  return json;
}


add(resource:T):Observable<any>{
  return this.httpClient.post(`${this.APIUrl}`,this.toServerModel(resource))
  .pipe(
    catchError((err)=>{
      throw new Error(err.message);
    })
  );
}


getList(p: {} = {}): Observable<Response<T>> {
  const params = new HttpParams({ fromObject: p });
  return this.httpClient.get<Response<T>>(`${this.APIUrl}?${params.toString()}`).pipe(
    map((list) => list),
    catchError((err) => {
      throw new Error(err.message);
    })
  );
}
}
