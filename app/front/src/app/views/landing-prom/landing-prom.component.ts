import { RegisterPromService } from './../../services/register-prom.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-prom',
  templateUrl: './landing-prom.component.html',
  styleUrls: ['./landing-prom.component.scss'],
  providers:[
    RegisterPromService
  ]
})
export class LandingPromComponent implements OnInit {

  constructor(private registerPromService: RegisterPromService) { }

  ngOnInit(): void {
    let submitProm = document.getElementById(`test-form-prom`)
    submitProm.addEventListener(`click`, ()=>{
      this.registerUserProm()
    })
    let downloadExcel = document.getElementById(`test-download-excel`)
    downloadExcel.addEventListener(`click`, ()=>{
      console.log('download');      
      this.downloadRegist()
    })
  }
  
  registerUserProm(){
    let name = (<HTMLInputElement>document.getElementById(`test-name`)).value
    let lastname = (<HTMLInputElement>document.getElementById(`test-lastname`)).value
    let document_id = (<HTMLInputElement>document.getElementById(`test-document`)).value
    let city = (<HTMLInputElement>document.getElementById(`test-city`)).value
    let phone = (<HTMLInputElement>document.getElementById(`test-phone`)).value
    let mail = (<HTMLInputElement>document.getElementById(`test-mail`)).value
    let authorization = (<HTMLInputElement>document.getElementById(`test-auth`)).checked == true ? 'true' : 'false'
    if (name && lastname && document_id && city && phone && mail && authorization) {
      let form = new FormData
      form.append('name', name)
      form.append('lastname', lastname)
      form.append('document', document_id)
      form.append('city', city)
      form.append('phone', phone)
      form.append('mail', mail)
      form.append('authorization', authorization)
      this.registerPromService.postRegist(form)
      .subscribe(res=>{
        console.log(res);        
      });      
    }

  }

  downloadRegist(){
    this.registerPromService.getRegist()
    .subscribe(res=>{
      console.log(res);  
      if (res) {
        const url = window.URL.createObjectURL(res.body);
        const anchor = document.createElement('a');
        anchor.download = `filename.xlsx`;
        anchor.href = url;
        anchor.click();
    }      
    });
  }

}
