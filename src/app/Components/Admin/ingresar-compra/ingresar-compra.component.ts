import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresar-compra',
  templateUrl: './ingresar-compra.component.html',
  styleUrls: ['./ingresar-compra.component.css']
})
export class IngresarCompraComponent implements OnInit {

  
  banderaNombre: boolean = false;
  banderaApellido: boolean = false;
  banderaDireccion: boolean = false;
  banderaCelular: boolean = false;
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
    if (this.registroForm.get('nombre')?.touched) {
      if (this.registroForm.get('nombre')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }

  }

  get apellidoNoValido() {
    if (this.registroForm.get('apellido')?.touched) {
      if (this.registroForm.get('apellido')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('apellido')?.invalid && this.registroForm.get('apellido')?.touched;
  }
  get direccionNoValido() {
    if (this.registroForm.get('direccion')?.touched) {
      if (this.registroForm.get('direccion')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('direccion')?.invalid && this.registroForm.get('direccion')?.touched;
  }
  get celularNoValido() {
    if (this.registroForm.get('celular')?.touched) {
      try {
        let numero = Number(this.registroForm.get('celular')?.value);
        if (numero) {
          if (this.registroForm.get('celular')?.invalid == false) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } catch (error) {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('celular')?.invalid && this.registroForm.get('celular')?.touched;
  }

  get correoNoValido() {
    if (this.registroForm.get('correo')?.touched) {
      if (this.registroForm.get('correo')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('correo')?.invalid && this.registroForm.get('correo')?.touched;
  }

  get contrasena1NoValido() {
    if (this.registroForm.get('contrasena1')?.touched) {
      if (this.registroForm.get('contrasena1')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }

  get contrasena2NoValido() {
    const contrasena1 = this.registroForm.get('contrasena1')?.value;
    const contrasena2 = this.registroForm.get('contrasena2')?.value;
    if (this.registroForm.get('contrasena2')?.touched) {
      if (this.registroForm.get('contrasena2')?.invalid == false) {
        if (contrasena1 === contrasena2) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return null;
    }


    //return (this.registroForm.get('contrasena2')?.touched && this.registroForm.get('contrasena2')?.invalid) ? true : (contrasena1 === contrasena2) ? false : true;
    //return (contrasena1 === contrasena2) ? false : true && this.registroForm.get('contrasena2')?.touched;
  }

  crearFormulario() {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.minLength(10)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasena1: ['', [Validators.required, Validators.minLength(8)]],
      contrasena2: ['', Validators.required]
    })
  }



}
