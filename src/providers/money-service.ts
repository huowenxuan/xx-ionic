import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class MoneyService {

  constructor(public http: Http) {
  }

  private get(url) : Promise<any> {
    let headers = new Headers({
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    })
    let options = new RequestOptions({headers: headers})
    return new Promise((resolve, reject)=>{
      this.http.get(url, options)
        .map((res)=>res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        })
    })


  }

}
