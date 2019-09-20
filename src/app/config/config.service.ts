import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://tweetsaver.herokuapp.com/?q=';

  get_tweets(searchText) : Observable {
  	
	return this.http.jsonp(
		this.configUrl+searchText+'&callback=JSONP_CALLBACK&count=10');
  }

}