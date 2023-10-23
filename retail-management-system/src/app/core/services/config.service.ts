import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Configuration, Environment } from '../models/configuration.model';
import { mergeMap } from 'rxjs/operators';
import { SettingsService } from './settings.service';

@Injectable()
export class ConfigService{
  private env: Environment = { env: 'development' };
  private config !:Configuration;
  envUrl= 'env';
  configUrl = '/config';

  constructor(private httpClient:HttpClient){

  }
  public getJSON<T>(url:string):Observable<T>
  {
    return this.httpClient.get<T>(url)
  }

  loadFile<T>(env:string,url:string):Observable<T>{
    return this.getJSON(`${url}/${env}.json`);

  }

  loadEnvironment():Observable<Environment>{
    if(environment.production) this.envUrl='env-prod';
    return this.loadFile<Environment>(this.envUrl,this.configUrl);
  }

  loadConfig(): Observable<Configuration> {
    return this.loadEnvironment().pipe(
      mergeMap((currentEnv) => {
        this.env = currentEnv;
        return this.loadFile<Configuration>(currentEnv.env, this.configUrl);
      })
    );
  }

  load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.loadConfig().subscribe(
        (config) => {
          this.config = config;
          SettingsService.configurationEnvironment = this.config;
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


}
