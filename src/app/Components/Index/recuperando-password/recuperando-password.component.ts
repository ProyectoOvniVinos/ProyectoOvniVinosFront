import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ClienteService } from '../../../Services/cliente.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-recuperando-password',
  templateUrl: './recuperando-password.component.html',
  styleUrls: ['./recuperando-password.component.css']
})
export class RecuperandoPasswordComponent implements OnInit {
  banderaPasswordTwo: boolean = null;
  banderaTerminos: boolean = false;
  correo: String;
  recuperandoForm: FormGroup;
  activar: Boolean;

  constructor(private fb: FormBuilder, public dialog: MatDialog, public clienteService: ClienteService, private activateRoute: ActivatedRoute, private router:Router) {
    this.crearFormulario();

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

  crearFormulario() {
    this.recuperandoForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasena1: ['', [Validators.required, Validators.minLength(8)]],
      contrasena2: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let correo = params['correo'];
      this.clienteService.getByEmail(this.desencriptar(correo)).subscribe((resp: ClienteModel) => {
        this.recuperandoForm.controls["correo"].setValue(resp.correoCliente)
      })
    })
  }
  get contrasena1Control(): FormControl {
    return this.recuperandoForm.get('contrasena1') as FormControl
  }

  get contrasena2Control(): FormControl {
    return this.recuperandoForm.get('contrasena2') as FormControl
  }
  get contrasena1NoValido() {
    if (this.recuperandoForm.get('contrasena1')?.touched) {
      if (this.recuperandoForm.get('contrasena1')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }
  get correoControl(): FormControl {
    return this.recuperandoForm.get('correo') as FormControl
  }
  get correoNoValido() {
    if (this.recuperandoForm.get('correo')?.touched) {
      if (this.recuperandoForm.get('correo')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('correo')?.invalid && this.registroForm.get('correo')?.touched;
  }
  get contrasena2NoValido() {
    const contrasena1 = this.recuperandoForm.get('contrasena1')?.value;
    const contrasena2 = this.recuperandoForm.get('contrasena2')?.value;
    if (this.recuperandoForm.get('contrasena2')?.touched) {
      if (this.recuperandoForm.get('contrasena2')?.invalid == false) {
        if (contrasena1 === contrasena2) {
          this.banderaPasswordTwo = true;
          return false;

        } else {
          this.banderaPasswordTwo = false;
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
  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }
  verificar() {
    console.log(this.recuperandoForm.invalid);

    if (this.recuperandoForm.invalid) {

      if (this.recuperandoForm.get("contrasena2").status == "INVALID") {

        let title = "Error"
        let mensaje = "Verifique los campos por favor!!"
        this.openDialog(title, mensaje);

      }

    } else {
      this.actualizar();
    }
  }
  desencriptar(correo: string) {
    let desencriptado = atob(correo)
    return desencriptado;
  }
  actualizar() {
    this.clienteService.getByEmail(this.recuperandoForm.controls["correo"].value).subscribe((resp: ClienteModel) => {

      resp.passwordCliente = this.recuperandoForm.controls["contrasena1"].value
      console.log(resp);
      this.clienteService.actualizar(resp).subscribe(respue => {
        this.openDialog("Actualizados", "Actualizo la contraseña con exito.");
        this.router.navigate(['/iniciarSesion'])
      })
    })
  }


  prueba() {
    console.log(window.screen);
    console.log(screen.width)
    console.log(screen.height)
  }

}
