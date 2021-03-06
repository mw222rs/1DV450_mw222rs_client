import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions } from "@angular/http";
import C from "../../constants";

import "rxjs/operator/toPromise";
import "rxjs/operator/do";

@Injectable()
export class TagService {
  private url: string = `${C.BASE_API_URL}/tags`;

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  public getTags() {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY});
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.get(this.url, options)
      .toPromise()
      .then(val => val.json().data)
      .catch(e => console.log(e));
  }

  public saveNew(tag) {
    const headers: Headers = new Headers({ "X-Api-key": C.API_KEY, "Content-Type": "application/json"});
    const options: RequestOptions = new RequestOptions({ headers });
    const payload = JSON.stringify({ tag: {name: tag} });

    return this.authHttp.post(this.url, payload, options)
      .toPromise();
  }

}
