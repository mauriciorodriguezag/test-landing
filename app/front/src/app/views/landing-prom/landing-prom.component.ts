import { RegisterPromService } from './../../services/register-prom.service';
import { Component, Inject, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-prom',
  templateUrl: './landing-prom.component.html',
  styleUrls: ['./landing-prom.component.scss'],
  providers: [
    RegisterPromService
  ]
})

export class LandingPromComponent implements OnInit {
  arrdeps: any[] = []
  arrcities: any[] = []
  infodeps: any;
  
  constructor(private registerPromService: RegisterPromService) {
    // Get Departments
    this.getDeps()
    
  }
  
  ngOnInit(): void {
    if (localStorage.getItem(`winneravissment`)) {
      let buttonClean = document.getElementById(`test-delete-excel`)
      buttonClean.classList.remove(`d-none`)
    }
    // Validate winner prom
    this.validateWinner()
    
    // Send form regist user
    let submitProm = document.getElementById(`test-form-prom`)
    submitProm.addEventListener(`click`, () => {
      this.registerUserProm()
      this.validateWinner()
    })
    // Download excel
    let downloadExcel = document.getElementById(`test-download-excel`)
    downloadExcel.addEventListener(`click`, () => {
      this.downloadRegist()
    })
    
    // Select department
    let selectDep = document.getElementById(`test-dep`)
    selectDep.addEventListener(`change`, () => {
      let dep = (<HTMLInputElement>document.getElementById(`test-dep`)).value
      // Clean array cities
      this.arrcities = []
      this.getCities(dep)
    })
    // Clean registers
    let buttonClean = document.getElementById(`test-delete-excel`)
    buttonClean.addEventListener(`click`, ()=>{
      this.clearUsers()
    })
  }
  
  registerUserProm() {
    let name = (<HTMLInputElement>document.getElementById(`test-name`)).value
    let lastname = (<HTMLInputElement>document.getElementById(`test-lastname`)).value
    let document_id = (<HTMLInputElement>document.getElementById(`test-document`)).value
    let department = (<HTMLInputElement>document.getElementById(`test-dep`)).value
    let city = (<HTMLInputElement>document.getElementById(`test-city`)).value
    let phone = (<HTMLInputElement>document.getElementById(`test-phone`)).value
    let mail = (<HTMLInputElement>document.getElementById(`test-mail`)).value
    let authorization = (<HTMLInputElement>document.getElementById(`test-auth`)).checked == true ? 'true' : 'false'
    if (name && lastname && document_id && department && city && phone && mail && authorization == 'true') {
      let form = new FormData
      form.append('name', name)
      form.append('lastname', lastname)
      form.append('document', document_id)
      form.append('department', department)
      form.append('city', city)
      form.append('phone', phone)
      form.append('mail', mail)
      form.append('authorization', authorization)
      swal.fire({
        icon: 'info',
        title: 'Estamos registrandote',
        text: 'Por favor espera unos momentos',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false
      });
      this.registerPromService.postRegist(form)
        .subscribe(res => {
          if (res.error) {
            swal.fire({
              title: `${res.response.title}`,
              text: `${res.response.text}`,
              icon: 'error',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#d4a84a'
            });
          }else{
            swal.fire({
              icon: 'success',
              title: 'Registro exitoso...',
              text: 'Gracias por participar',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#d4a84a'
            });
          }
          
        },
          err => {
            swal.fire({
              title: 'Lo sentimos',
              text: 'Tenemos problemas para conectarnos con nuestros servidores. Intenta más tarde ;)',
              icon: 'error',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#d4a84a'
            })
          });
    } else {
      swal.fire({
        icon: 'warning',
        title: 'Lo sentimos',
        text: 'Por favor registra todos tus datos y permítenos hacer uso de esos datos para participar',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#d4a84a'
      });
    }

  }

  downloadRegist() {
    swal.fire({
      icon: 'info',
      title: 'Estamos preparando tu archivo',
      text: 'Danos unos segundos...',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    this.registerPromService.getRegist()
      .subscribe(res => {
        if (res) {
          const url = window.URL.createObjectURL(res.body);
          const anchor = document.createElement('a');
          let date = new Date()
          anchor.download = `report-${date}.xlsx`;
          anchor.href = url;
          anchor.click();
          swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Tu archivo se descargó correctamente',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#d4a84a'
          });
        }
      },
        err => {
          swal.fire({
            title: 'Lo sentimos',
            text: 'Tenemos problemas para obtener el archivo',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#d4a84a'
          });
        });
  }

  validateWinner() {
    if (!localStorage.getItem(`winneravissment`)) {
      this.registerPromService.getWinner()
        .subscribe(res => {
          if (res.winner.id != undefined) {
            let buttonClean = document.getElementById(`test-delete-excel`)
            buttonClean.classList.remove(`d-none`)
            let imagewinn = document.getElementById(`test-image-winn`)
            imagewinn.classList.remove(`d-none`)
            swal.fire({
              title: `Felicidades ${res.winner.name} ${res.winner.lastname}`,
              text: `Gracias por hacernos parte de tus aventuras, disfruta de tu premio. ;)`,
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#d4a84a'
            })
            .then(() => {
              localStorage.setItem(`winneravissment`, `${res.winner.name} ${res.winner.lastname}`)
              imagewinn.classList.add(`d-none`)
            })
          }
        });      
    }else{
      let bannerWinner = document.getElementById(`test-banner-winner`)
      bannerWinner.innerHTML = `<h2 class="text-uppercase text-white">Felicidades a ${localStorage.getItem(`winneravissment`)} por la obtención del premio. Agradecemos a todos los participantes.</h2>`
      bannerWinner.classList.remove(`d-none`)
      let inputs = document.querySelectorAll(`input, select, #test-form-prom`)
      for (const key in inputs) {
        if (Object.prototype.hasOwnProperty.call(inputs, key)) {
          const element = inputs[key];
          element.setAttribute(`disabled`, 'true')
          
        }
      }
    }
  }

  clearUsers(){
    swal.fire({
      icon: 'info',
      title: 'Estamos limpiando los reportes',
      text: 'Danos unos segundos...',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    this.registerPromService.deleteAllUsers()
      .subscribe(res => {
          let buttonClean = document.getElementById(`test-delete-excel`)
          buttonClean.classList.add(`d-none`)
          localStorage.removeItem(`winneravissment`)
          window.location.href = '/'
          swal.fire({
            title: `Ha eliminado correctamente los registros`,
            text: `Puede comenzar de 0 la prueba. ;)`,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#d4a84a'
          })
      });
  }

  getDeps() {
    this.registerPromService.getDeparmentsAndCities()
      .subscribe(res => {
        this.infodeps = res.data
        if (this.infodeps) {
          this.infodeps.forEach(element => {
            this.arrdeps.push(element[10])
          });
          this.arrdeps = this.arrdeps.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
        }
      });
  }

  getCities(dep) {
    if (this.infodeps) {
      this.infodeps.forEach(element => {
        if (element[10] == dep) {
          this.arrcities.push(element[12])
        }
      });
    }
  }

}
