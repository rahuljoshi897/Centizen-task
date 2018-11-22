import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserDataService {

	 private subject = new BehaviorSubject<any>("");
	 constructor() {
        this.getData$ = this.subject.asObservable();
    }
sendData(data) {
        this.subject.next(data);
    }
 
   
    clearMessage() {
        this.subject.next();
    }
}
