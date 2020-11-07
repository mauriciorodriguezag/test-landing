import { RegisterPromService } from './../../services/register-prom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-prom',
  templateUrl: './landing-prom.component.html',
  styleUrls: ['./landing-prom.component.scss']
})
export class LandingPromComponent implements OnInit {

  constructor(private registerPromService: RegisterPromService) { }

  ngOnInit(): void {
    let submitProm = document.getElementById(`test-form-prom`)
    submitProm.addEventListener(`click`, ()=>{
      this.registerUserProm()
    })
  }

  registerUserProm(){
    let name = document.getElementById(`test-name`)
    let lastname = document.getElementById(`test-lastname`)
    let document_id = document.getElementById(`test-document`)
    let city = document.getElementById(`test-city`)
    let phone = document.getElementById(`test-phone`)
    let mail = document.getElementById(`test-mail`)
    let auth = document.getElementById(`test-auth`)
    this.registerPromService.postRegist()
      .subscribe(res=>{
        console.log(res);        
      });

  }

}
