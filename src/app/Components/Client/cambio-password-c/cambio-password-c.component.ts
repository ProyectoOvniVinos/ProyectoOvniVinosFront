import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { LoginService } from 'src/app/Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-cambio-password-c',
  templateUrl: './cambio-password-c.component.html',
  styleUrls: ['./cambio-password-c.component.css']
})
export class CambioPasswordCComponent implements OnInit {
  cambioForm: FormGroup;
  banderaPasswordTwo: boolean ;
  activar: Boolean;

  constructor(private fb: FormBuilder, private loginService: LoginService, private clienteService: ClienteService,private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  ver(event, img){
    this.activar = !this.activar;
    console.log();
    
    if(this.activar==true){
      event.type='text';
      img.src='../../../../assets/Images/oculto.png'

    }else{
      event.type='password';
      img.src='../../../../assets/Images/ver.png'
    }
  }

  get passwordOneControl(): FormControl{
    return this.cambioForm.get('passwordOne') as FormControl
  }

  get passwordTwoControl(): FormControl{
    return this.cambioForm.get('passwordTwo') as FormControl
  }


  get passwordOneNoValido() {
    if(this.cambioForm.get('passwordOne')?.touched){
      if(this.cambioForm.get('passwordOne')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  get passwordTwoNoValido() {
    const contrasena1 = this.cambioForm.get('passwordOne')?.value;
    const contrasena2 = this.cambioForm.get('passwordTwo')?.value;
    if(this.cambioForm.get('passwordTwo')?.touched){
      if(this.cambioForm.get('passwordTwo')?.invalid == false){
        if(contrasena1 === contrasena2){
          this.banderaPasswordTwo=true;
          return false;

        }else{
          this.banderaPasswordTwo=false;
          return true;
        }
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  crearFormulario() {
    this.cambioForm = this.fb.group({
      passwordOne: ['', [Validators.required, Validators.minLength(8)]],
      passwordTwo: ['', Validators.required]
    })
  }

  
  confirmar(){
    this.openDialogLoading()
    if(this.cambioForm.valid){
      let usuario: any = this.loginService.usuario;
      console.log(usuario);
      
      let cliente = new ClienteModel();
      cliente.passwordCliente=this.cambioForm.get('passwordOne').value;
    
  
      this.clienteService.getByEmail(usuario.correo).subscribe(clienteEncontrado => {
  
        clienteEncontrado.passwordCliente = cliente.passwordCliente;
  
        this.clienteService.actualizar(clienteEncontrado).subscribe( response => {
          this.closeDialogLoading();
          this.openDialog("Exito", "Se ha actualizado su contraseña exitosamente!!")
          this.router.navigate(['/datosC'])
        }, err=> {
          this.closeDialogLoading();
          this.openDialog("Error", "No se pudo cambiar la contraseña!!")
        })
      }, err => {
        this.closeDialogLoading();
        this.openDialog("Error", "Ha ocurrido un error, porfavor intentelo nuevamente")
      })
    }else{
      this.closeDialogLoading();
      this.openDialog("Error","Porfavor DIligencie todos los campos")
    }




  }
}
