import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdministradorModel } from 'src/app/Models/Administrador.model';
import { AdminService } from 'src/app/Services/admin.service';
import { LoginService } from 'src/app/Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-cambio-password-a',
  templateUrl: './cambio-password-a.component.html',
  styleUrls: ['./cambio-password-a.component.css']
})
export class CambioPasswordAComponent implements OnInit {
  cambioForm: FormGroup;
  banderaPasswordTwo: boolean = false ;
  activar:Boolean;

  constructor(private fb: FormBuilder, private adminService: AdminService, private loginServico: LoginService, private dialog: MatDialog, private router: Router) { }

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

  crearFormulario() {
    this.cambioForm = this.fb.group({
      passwordOne: ['', [Validators.required, Validators.minLength(8)]],
      passwordTwo: ['', Validators.required]
    })
  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  confirmar(){
    this.openDialogLoading();

    if(this.cambioForm.valid){
      let usuario: any = this.loginServico.usuario;
      console.log(usuario);
      
      let admin = new AdministradorModel();
      admin.passwordAdmin=this.cambioForm.get('passwordOne').value;
    
  
      this.adminService.getAdminById(usuario.correo).subscribe(adminEncontrado => {
  
        adminEncontrado.passwordAdmin = admin.passwordAdmin;
  
        this.adminService.updateAdmin(adminEncontrado.correoAdmin ,adminEncontrado).subscribe( response => {
          this.closeDialogLoading()
          this.openDialog("Exito", "Se ha actualizado su contraseña exitosamente!!")
          this.router.navigate(['/datosA'])
        }, err=> {
          this.closeDialogLoading()
          this.openDialog("Error", "No se pudo cambiar la contraseña!!")
        })
      }, err => {
        this.closeDialogLoading()
        this.openDialog("Error", "Ha ocurrido un error, porfavor intentelo nuevamente")
      })
    }else{
      this.closeDialogLoading()
      this.openDialog("Error","Porfavor DIligencie todos los campos")
    }




  }


}
