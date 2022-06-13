import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  banderaPasswordTwo: boolean = false;
  

  registroForm !: FormGroup;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.crearListeners();
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

  get nombreNoValido() {

    if(this.registroForm.get('nombre')?.invalid == false && this.registroForm.get('nombre')?.touched){
      this.banderaNombre=true;
      return false;
    }else{
      return true;
    }

  }

  get apellidoNoValido() {
    return this.registroForm.get('apellido')?.invalid && this.registroForm.get('apellido')?.touched;
  }
  get direccionNoValido() {
    return this.registroForm.get('direccion')?.invalid && this.registroForm.get('direccion')?.touched;
  }
  get celularNoValido() {
    return this.registroForm.get('celular')?.invalid && this.registroForm.get('celular')?.touched;
  }

  get correoNoValido() {
    return this.registroForm.get('correo')?.invalid && this.registroForm.get('correo')?.touched;
  }

  get contrasena1NoValido() {
    return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }

  get contrasena2NoValido() {
    const contrasena1 = this.registroForm.get('contrasena1')?.value;
    const contrasena2 = this.registroForm.get('contrasena2')?.value;

    return (contrasena1 === contrasena2) ? false : true && this.registroForm.get('contrasena2')?.touched;
  }

  crearFormulario() {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      direccion:['', [Validators.required, Validators.minLength(3)]],
      celular:[[Validators.required,]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasena1: ['', [Validators.required, Validators.minLength(8)]],
      contrasena2: ['', Validators.required]
    })
  }

}
