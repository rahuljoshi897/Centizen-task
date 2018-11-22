import { Component, OnInit } from '@angular/core';
import { UserDataService } from "../../services/user-data.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
userData = [];
aa = 0;
  constructor(private userdata: UserDataService) { }

  ngOnInit() {
      this.userdata.getData$.subscribe(data => { 
      	if(data==null || data==''){
      		 let data = localStorage.getItem('userData');
		   this.userData = JSON.parse(data);
	  }else{
	 	this.userData = JSON.parse(data);
	  }
	});

}

}
