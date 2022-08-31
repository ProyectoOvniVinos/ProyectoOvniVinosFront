import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ClienteService } from '../../../Services/cliente.service';
import { ConvertirClienteService } from '../../../Services/convertir-cliente.service';
import { LoginService } from '../../../Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
  styleUrls: ['./editar-datos.component.css']
})
export class EditarDatosComponent implements OnInit {

  banderaPasswordTwo: boolean = false;
  cliente:ClienteModel;
  usuario;

  actualizarForm !: FormGroup;
  constructor(private fb: FormBuilder,public loginService:LoginService,
    private clienteService: ClienteService, private convertirCliente:ConvertirClienteService,
    private router:Router,public dialog: MatDialog) {
    this.crearFormulario();
    this.crearListeners();
  } 
  
  ngOnInit(): void {

    this.usuario = this.loginService.usuario;
    this.clienteService.getByEmail(this.usuario.correo).subscribe(cliente=>{
      this.actualizarForm.controls['nombre'].setValue(cliente.nombreCliente); 
      this.actualizarForm.controls['apellido'].setValue(cliente.apellidoCliente); 
      this.actualizarForm.controls['direccion'].setValue(cliente.direccionCliente); 
      this.actualizarForm.controls['celular'].setValue(cliente.telefonoCliente); 
      this.actualizarForm.controls['contrasena1'].setValue(cliente.passwordCliente); 
      this.actualizarForm.controls['contrasena2'].setValue(cliente.passwordCliente);
      this.cliente = cliente;
    });

  }

  crearListeners() {
    this.actualizarForm.get('nombre')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('apellido')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('direccion')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('celular')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('correo')?.valueChanges.subscribe(console.log);
  }

  get nombreControl(): FormControl{
    return this.actualizarForm.get('nombre') as FormControl
  }

  get apellidoControl(): FormControl{
    return this.actualizarForm.get('apellido') as FormControl
  }

  get direccionControl(): FormControl{
    return this.actualizarForm.get('direccion') as FormControl
  }

  get celularControl(): FormControl{
    return this.actualizarForm.get('celular') as FormControl
  }

  get contrasena1Control(): FormControl{
    return this.actualizarForm.get('contrasena1') as FormControl
  }

  get contrasena2Control(): FormControl{
    return this.actualizarForm.get('contrasena2') as FormControl
  }


  get nombreNoValido() {
    if(this.actualizarForm.get('nombre')?.touched){
      if(this.actualizarForm.get('nombre')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  get apellidoNoValido() {
    if(this.actualizarForm.get('apellido')?.touched){
      if(this.actualizarForm.get('apellido')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('apellido')?.invalid && this.registroForm.get('apellido')?.touched;
  }
  get direccionNoValido() {
    if(this.actualizarForm.get('direccion')?.touched){
      if(this.actualizarForm.get('direccion')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('direccion')?.invalid && this.registroForm.get('direccion')?.touched;
  }
  get celularNoValido() {
    if(this.actualizarForm.get('celular')?.touched){
      try {
        let numero = Number(this.actualizarForm.get('celular')?.value);
        if(numero){
          if(this.actualizarForm.get('celular')?.invalid == false){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      } catch (error) {
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('celular')?.invalid && this.registroForm.get('celular')?.touched;
  }
  get contrasena1NoValido() {
    if(this.actualizarForm.get('contrasena1')?.touched){
      if(this.actualizarForm.get('contrasena1')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }

  get contrasena2NoValido() {
    const contrasena1 = this.actualizarForm.get('contrasena1')?.value;
    const contrasena2 = this.actualizarForm.get('contrasena2')?.value;
    if(this.actualizarForm.get('contrasena2')?.touched){
      if(this.actualizarForm.get('contrasena2')?.invalid == false){
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
    //return (this.registroForm.get('contrasena2')?.touched && this.registroForm.get('contrasena2')?.invalid) ? true : (contrasena1 === contrasena2) ? false : true;
    //return (contrasena1 === contrasena2) ? false : true && this.registroForm.get('contrasena2')?.touched;
  }


  crearFormulario() {
    this.actualizarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      direccion:['', [Validators.required, Validators.minLength(3)]],
      celular:['',[Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]/)]],
      contrasena1: ['', [Validators.required, Validators.minLength(8)]],
      contrasena2: ['', Validators.required]
    })
  }

  editar(){
    if(this.actualizarForm.valid){
      this.cliente.nombreCliente = this.actualizarForm.controls['nombre'].value;
      this.cliente.apellidoCliente = this.actualizarForm.controls['apellido'].value;
      this.cliente.direccionCliente = this.actualizarForm.controls['direccion'].value;
      this.cliente.telefonoCliente = this.actualizarForm.controls['celular'].value;
      this.cliente.passwordCliente = this.actualizarForm.controls['contrasena1'].value;
      this.cliente = this.convertirCliente.convertir(this.cliente);
      this.clienteService.actualizar(this.cliente).subscribe(cliente=>{
        
        this.router.navigate(['/datosC']);
        this.openDialog("Felicitaciones","Se actualizaron sus datos con exito")
      },error=>{
        this.openDialog("Error",error.error.mensaje)
      });
    }
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

}
