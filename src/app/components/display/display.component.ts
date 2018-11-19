import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
userData = [];
aa = 0;
  constructor() { }

  ngOnInit() {
	  //get value from localstorage..
	  let data = localStorage.getItem('userData');
	  if(data!=null){
		   this.userData = JSON.parse(data);
	  }
	  
  }

}
