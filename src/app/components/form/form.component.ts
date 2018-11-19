import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators,ValidatorFn,AbstractControl,FormControl }   from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	UserForm:any;
	subscriptionArr:any[];
	AllErrors : any[];
	SuccessMessage = '';
	ErrorMessage = '';
	
  constructor(private route:ActivatedRoute,private route1:Router,private fb: FormBuilder) {
	 this.subscriptionArr = ['Basic','Advanced','Pro']; 
	 //console.log(this.subscriptionArr,'vvv');
	let regGroup = {
		'user_email' :  ['',Validators.compose([Validators.required,this.EmailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )])],
		'subscription' :  ['', [Validators.required]],
		'password' : ['',Validators.compose([Validators.required,this.EmailValidator(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/ )])]
	}
	
	this.UserForm = this.fb.group(regGroup);
	this.UserForm.controls['subscription'].setValue('Advanced');

  }

  ngOnInit() {
  }
  
EmailValidator(regEmail: RegExp): ValidatorFn {
	  return (control: AbstractControl): { [key: string]: any } => {
	    const value = control.value;
	        if (value === '') {
	       		return { 'patternInvalid': { regEmail } }
	    	}
	    //check for valid Email..
	    if(!regEmail.test(value)){
	    	return { 'patternInvalid': { regEmail } }
	    }else{
	    	return null;
	    }
	  };
	}
	AddUserDetails(){
		//Store data in localstorage. As I don't know do I need to pass data by observable, so here i am storing the data in localstorage..
		
		if(!this.UserForm.valid){
			this.SuccessMessage = '';
			this.ErrorMessage = '';
			this.validateAllFormFields(this.UserForm);
			return false;
		}
		this.ErrorMessage = '';
		let JsonVal = JSON.parse(localStorage.getItem('userData'));
		let TempArr = [];
		if(JsonVal){
			for(let i=0;i<JsonVal.length;i++){
				TempArr.push(JsonVal[i]);
			}
		}
		let formData = {
					'user_email':this.UserForm.controls['user_email'].value,
					'subscription':this.UserForm.controls['subscription'].value,
					'password':this.UserForm.controls['password'].value,
				}
		TempArr.push(formData);
		localStorage.setItem('userData', JSON.stringify(TempArr));
		this.UserForm.reset();
		this.UserForm.controls['subscription'].setValue('Advanced');
		this.SuccessMessage = 'Data has been saved  successfully';
	}
	validateAllFormFields(formGroup: FormGroup){
		let MessageObj = {'user_email':'Please Enter valid Email','password':'Please Enter Valid Password(Password must be 8 character long with at least one character and one special character)'};
		 Object.keys(formGroup.controls).forEach(field => {
	    const control = formGroup.get(field);
	   	if (control instanceof FormControl) {
				if(this.UserForm.controls[field].status=="INVALID"){
					this.ErrorMessage += MessageObj[field]+'<br>';
				}	
	   		}
	  	});
	}
	resetForm(){
		//check if form contains value or not?
		if(!this.checkForValue(this.UserForm) || !this.checkForSubscriptionsVal()){
			if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
				this.UserForm.reset();
				this.UserForm.controls['subscription'].setValue('Advanced');
				this.ErrorMessage = '';
				this.SuccessMessage = '';
				return true;
			} else {
				return false;
			}
		}
		 
		
	}
	checkForValue(formGroup: FormGroup){
		let fieldArr = ['password','user_email'];
		var status = 0;
		 Object.keys(formGroup.controls).forEach(field => {
	    const control = formGroup.get(field);
	   	if (control instanceof FormControl) {
				if(this.UserForm.controls[field].value!='' && fieldArr.indexOf(field) !=-1 ){
					status  = 1;
			    }		
	   		}
	  	});
		if(status){
			return false;
		}else{
			return true;
		}
	}
	checkForSubscriptionsVal(){
		if(this.UserForm.controls['subscription'].value=='Advanced'){
			return true;
		}
		return false;
	}
}
