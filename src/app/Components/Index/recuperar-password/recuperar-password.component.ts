import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ClienteService } from '../../../Services/cliente.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  public recuperarForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    codigo: new FormControl('',[Validators.required]),
  });

  
  get emailControl(): FormControl{
    return this.recuperarForm.get('email') as FormControl;
  }

  get codigoControl(): FormControl{
    return this.recuperarForm.get('codigo') as FormControl;
  }

  get emailNoValido() {
    if(this.recuperarForm.get('email')?.touched){
      if(this.recuperarForm.get('email')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  constructor(private clienteService: ClienteService,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(titleNew: string, mensajeNew: string): void {
    
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  enviar(){
    
    this.clienteService.getByEmail(this.recuperarForm.controls["email"].value).subscribe((resp:ClienteModel) => {
      let urlya = window.location
      this.clienteService.recuperarPassword(urlya.origin,this.encriptar(resp.correoCliente)).subscribe(resp=>{
        
        this.openDialog("Recuperar", "Se le envio un correo de verificacion para recuperar su contraseña");

      })
      
      
    },err=>{

      this.openDialog("Error", err.error.mensaje);
    })
  }
  encriptar(correo:string){

    let encriptado = btoa(correo)
    return encriptado;
  }
}
