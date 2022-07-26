import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  banderaNombre : boolean = false;
  banderaApellido : boolean = false;
  banderaDireccion : boolean = false;
  banderaCelular : boolean = false;
  banderaCorreo: boolean = false;
  banderaPasswordOne: boolean = false;
  banderaPasswordTwo: boolean = null;
  banderaEdad: boolean = false;
  banderaTerminos: boolean = false;

  edades=101;
  arregloEdades: number[] = [];

  registroForm !: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
    this.crearArregloEdad();    
  }

  crearArregloEdad(){
    
    let index:number = 18;
    while(index < this.edades){
        this.arregloEdades.push(index);
        index++;
    }
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
    console.log(this.registroForm.get('celular').hasError('minLength'));
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

  registrar() {
    if(this.registroForm.invalid){
      this.banderaTerminos=false;
    }else{
      this.banderaTerminos=true;

    }
  }

  cerrar(){

  }

}
