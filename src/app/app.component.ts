import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ConfigService } from './config/config.service';
import { Tweet } from './tweet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  	title = 'tweet-app';
  	searchedTweets = [];
  	savedTweets = localStorage.getItem("storedTweets")!== null 
  		? convertToArray(localStorage.getItem("storedTweets")) : [];

  	constructor(private configService: ConfigService) {};
			
	searchTweets(event: any){
		this.configService.get_tweets(event.target.value)
			.subscribe((res : Tweet[])=>{ 
				this.searchedTweets = res.tweets;
				console.log(res);
				console.log(res.tweets);
    	});
	}

	onDrop(event: CdkDragDrop<string[]>) {

	  if (event.previousContainer === event.container) {
	    moveItemInArray(event.container.data,
	      event.previousIndex,
	      event.currentIndex);
	  } else {
	    transferArrayItem(event.previousContainer.data,
	      event.container.data,
	      event.previousIndex, event.currentIndex);
	  }

	  localStorage.setItem("storedTweets",JSON.stringify(this.savedTweets));
	 
	}

	clearTweets(){
		this.searchedTweets = null;
	}

	clearStorage(){
		localStorage.clear();
	}
}


function convertToArray(storedList){
	
	let parsedObject = JSON.parse(storedList);
	let newArry = [];
	newArry.push(parsedObject);
	
	return newArry[0];
}
