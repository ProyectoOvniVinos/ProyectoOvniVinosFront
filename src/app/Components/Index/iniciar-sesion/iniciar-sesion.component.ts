import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  activar: Boolean=false;

  constructor(public dialog: MatDialog, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  ver(event1, event2){
    this.activar = !this.activar;
    console.log();
    
    if(this.activar==true){
      event1.type='text';
      event2.src='../../../../assets/Images/oculto.png'

    }else{
      event1.type='password';
      event2.src='../../../../assets/Images/ver.png'
    }
  }

  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });

  get emailControl(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  get passwordNoValido() {
    if(this.loginForm.get('password')?.touched){
      if(this.loginForm.get('password')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  get emailNoValido() {
    if(this.loginForm.get('email')?.touched){
      if(this.loginForm.get('email')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  iniciarSecion(){

    if(!this.loginForm.invalid){

      this.loginService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(response => {
        this.loginService.guardarUsuario(response.access_token);
        this.loginService.guardarToken(response.access_token);
        this.router.navigate(['/catalogo']);
      }, error => {
        this.openDialog("Advertencia","datos incorrectos")
      });

    }else{
      this.openDialog("ERROR","Verifique que todos los campos estén diligenciados.")
    }
    
  }

}
