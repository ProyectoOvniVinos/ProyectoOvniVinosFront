import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdministradorModel } from '../../../Models/Administrador.model';
import { AdminService } from '../../../Services/admin.service';
import { LoginService } from '../../../Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-editar-datos-adm',
  templateUrl: './editar-datos-adm.component.html',
  styleUrls: ['./editar-datos-adm.component.css']
})
export class EditarDatosAdmComponent implements OnInit {

  banderaPasswordTwo: boolean = false;
  usuario;
  admin: AdministradorModel;
  bandera: boolean=null;

  actualizarForm !: FormGroup;
  constructor(private fb: FormBuilder, public loginService: LoginService, private adminService: AdminService, private router: Router, public dialog: MatDialog) {
    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {

    this.usuario = this.loginService.usuario;
    this.adminService.getAdminById(this.usuario.correo).subscribe((admin: AdministradorModel) => {
      this.actualizarForm.controls['nombre'].setValue(admin.nombreAdmin);
      this.actualizarForm.controls['apellido'].setValue(admin.apellidoAdmin);
      this.actualizarForm.controls['direccion'].setValue(admin.direccionAdmin);
      this.actualizarForm.controls['celular'].setValue(admin.telefonoAdmin);
      this.admin = admin;
      this.bandera=true;
    })
  }

  crearListeners() {
    this.actualizarForm.get('nombre')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('apellido')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('direccion')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('celular')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('correo')?.valueChanges.subscribe(console.log);
  }

  get nombreControl(): FormControl {
    return this.actualizarForm.get('nombre') as FormControl
  }

  get apellidoControl(): FormControl {
    return this.actualizarForm.get('apellido') as FormControl
  }

  get direccionControl(): FormControl {
    return this.actualizarForm.get('direccion') as FormControl
  }

  get celularControl(): FormControl {
    return this.actualizarForm.get('celular') as FormControl
  }


  get nombreNoValido() {
    if (this.actualizarForm.get('nombre')?.touched) {
      if (this.actualizarForm.get('nombre')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }

  }
  get apellidoNoValido() {
    if (this.actualizarForm.get('apellido')?.touched) {
      if (this.actualizarForm.get('apellido')?.invalid == false) {
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
    if (this.actualizarForm.get('direccion')?.touched) {
      if (this.actualizarForm.get('direccion')?.invalid == false) {
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
    if (this.actualizarForm.get('celular')?.touched) {
      try {
        let numero = Number(this.actualizarForm.get('celular')?.value);
        if (numero) {
          if (this.actualizarForm.get('celular')?.invalid == false) {
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

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  crearFormulario() {
    this.actualizarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]/)]]
    })
  }

  editar() {
    console.log(this.actualizarForm.valid);
    this.openDialogLoading();
    if (this.actualizarForm.valid) {
      this.admin.nombreAdmin = this.actualizarForm.controls['nombre'].value;
      this.admin.apellidoAdmin = this.actualizarForm.controls['apellido'].value;
      this.admin.direccionAdmin = this.actualizarForm.controls['direccion'].value;
      this.admin.telefonoAdmin = this.actualizarForm.controls['celular'].value;

      this.adminService.updateAdmin(this.admin.correoAdmin, this.admin).subscribe(resp => {
        this.closeDialogLoading();
        this.router.navigate(['/datosA']);
        this.openDialog("Felicitaciones", "Se actualizaron sus datos con exito")
      }, error => {
        this.closeDialogLoading();
        this.openDialog("Error", error.error.mensaje)
      });
    }
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }

  

}
