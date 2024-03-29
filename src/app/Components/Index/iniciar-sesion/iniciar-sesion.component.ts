import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdministradorModel } from '../../../Models/Administrador.model';
import { AdminService } from '../../../Services/admin.service';
import { ClienteService } from '../../../Services/cliente.service';
import { SocketPedidoService } from '../../../Services/socket-pedido.service';
import { LoginService } from '../../../Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  activar: Boolean=false;
  constructor(public dialog: MatDialog, private loginService: LoginService, private router: Router,
              private adminservice: AdminService, private clienteService: ClienteService, 
              private pedidoSocket:SocketPedidoService) { }

  


  ngOnInit(): void {
  }

  openDialogLoading(): void {
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '150px',
    });
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  ver(event1, event2){
    this.activar = !this.activar;
    
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

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  iniciarSecion(){

    this.openDialogLoading();
    if(!this.loginForm.invalid){
      this.loginService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(response => {

        this.loginService.guardarUsuario(response.access_token);
        this.loginService.guardarToken(response.access_token);
        
        if(this.loginService.usuario.rol=="ROLE_ADMIN"){
          this.adminservice.getAdminById(this.loginService.usuario.correo).subscribe((resp:AdministradorModel)=>{
            
            if(resp.estado=='1'){
              this.closeDialogLoading()
              this.router.navigate(['/catalogo']);
            }else{
              this.closeDialogLoading();
              this.loginService.logout();
              this.openDialog("Inicio de sesión fallido", "Su usuario administrador se encuentra deshabilitado.")
            }
          });
        }else{
          this.closeDialogLoading();
          this.router.navigate(['/catalogo']);
        }
      }, error => {
        this.closeDialogLoading();
        this.openDialog("ADVERTENCIA","Datos incorrectos.")
      });

    }else{
      this.closeDialogLoading();
      this.openDialog("ERROR","Verifique que todos los campos estén diligenciados.")
    }
    
  }


}
