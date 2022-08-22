import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  banderaPasswordTwo: boolean = null;
  banderaTerminos: boolean = false;
  registroForm !: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog, public clienteService:ClienteService) {
    this.crearFormulario();
    this.crearListeners();

  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  ngOnInit(): void {

  }

  crearListeners() {
    this.registroForm.get('nombre')?.valueChanges.subscribe(console.log);
    this.registroForm.get('apellido')?.valueChanges.subscribe(console.log);
    this.registroForm.get('direccion')?.valueChanges.subscribe(console.log);
    this.registroForm.get('celular')?.valueChanges.subscribe(console.log);
    this.registroForm.get('correo')?.valueChanges.subscribe(console.log);
  }

  get nombreControl(): FormControl{
    return this.registroForm.get('nombre') as FormControl
  }

  get apellidoControl(): FormControl{
    return this.registroForm.get('apellido') as FormControl
  }

  get direccionControl(): FormControl{
    return this.registroForm.get('direccion') as FormControl
  }

  get celularControl(): FormControl{
    return this.registroForm.get('celular') as FormControl
  }

  get correoControl(): FormControl{
    return this.registroForm.get('correo') as FormControl
  }

  get contrasena1Control(): FormControl{
    return this.registroForm.get('contrasena1') as FormControl
  }

  get contrasena2Control(): FormControl{
    return this.registroForm.get('contrasena2') as FormControl
  }

  get edadControl(): FormControl{
    return this.registroForm.get('edad') as FormControl
  }

  get terminosControl(): FormControl{
    return this.registroForm.get('terminos') as FormControl
  }

  get nombreNoValido() {
    if(this.registroForm.get('nombre')?.touched){
      if(this.registroForm.get('nombre')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  get apellidoNoValido() {
    if(this.registroForm.get('apellido')?.touched){
      if(this.registroForm.get('apellido')?.invalid == false){
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
    if(this.registroForm.get('direccion')?.touched){
      if(this.registroForm.get('direccion')?.invalid == false){
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
    if(this.registroForm.get('celular')?.touched){
      try {
        let numero = Number(this.registroForm.get('celular')?.value);
        if(numero){
          if(this.registroForm.get('celular')?.invalid == false){
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

  get correoNoValido() {
    if(this.registroForm.get('correo')?.touched){
      if(this.registroForm.get('correo')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('correo')?.invalid && this.registroForm.get('correo')?.touched;
  }

  get contrasena1NoValido() {
    if(this.registroForm.get('contrasena1')?.touched){
      if(this.registroForm.get('contrasena1')?.invalid == false){
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
    const contrasena1 = this.registroForm.get('contrasena1')?.value;
    const contrasena2 = this.registroForm.get('contrasena2')?.value;
    if(this.registroForm.get('contrasena2')?.touched){
      if(this.registroForm.get('contrasena2')?.invalid == false){
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

  get edadNoValido(){
    if(this.registroForm.get('edad')?.touched){
      if(this.registroForm.get('edad')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
  }

  get terminosNoValido(){
    if(this.registroForm.get('terminos')?.touched){
      if(this.registroForm.get('terminos')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
  }

  crearFormulario() {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      direccion:['', [Validators.required, Validators.minLength(3)]],
      celular:['',[Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]/)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasena1: ['', [Validators.required, Validators.minLength(8)]],
      contrasena2: ['', Validators.required],
      edad: ['',[Validators.required,  Validators.pattern(/^[0-9]/), Validators.maxLength(2)]],
      terminos: ['', Validators.requiredTrue]
    })
  }

  verificar() {
    console.log("ASDASD");
    
    if(this.registroForm.invalid){

      if(
          this.registroForm.get("nombre").status == "INVALID" || this.registroForm.get("apellido").status == "INVALID" || 
          this.registroForm.get("celular").status == "INVALID" || this.registroForm.get("correo").status == "INVALID" ||
          this.registroForm.get("direccion").status == "INVALID" || this.registroForm.get("contrasena1").status == "INVALID" || 
          this.registroForm.get("contrasena2").status == "INVALID" || this.registroForm.get("edad").status == "INVALID" 
      ){
        console.log("BBBBBBBBBBBBBBBBBBBBBB");
        
        let title="Error"
        let mensaje="Verifique los campos por favor!!"
        this.openDialog(title, mensaje);
        
      }else if(this.registroForm.get("terminos").status== "INVALID"){
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCC");
        let title="Advertencia"
        let mensaje="Por favor Acepte Terminos y Condiciones!!"
        this.openDialog(title, mensaje);
      }

    }else{
      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDD");
      this.registrar();
    }
  }

  registrar(){
    let cliente = new ClienteModel();
    cliente.correoCliente = this.registroForm.controls['correo'].value
    cliente.nombreCliente = this.registroForm.controls['nombre'].value
    cliente.apellidoCliente = this.registroForm.controls['apellido'].value
    cliente.direccionCliente= this.registroForm.controls['direccion'].value
    cliente.telefonoCliente= this.registroForm.controls['celular'].value
    cliente.passwordCliente=this.registroForm.controls['contrasena1'].value

    this.clienteService.registro(cliente).subscribe(res=>{
      console.log(res);
      
    });
  }

}
