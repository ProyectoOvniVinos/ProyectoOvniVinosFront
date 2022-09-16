import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  ayudaForm !: FormGroup;
  banderaTextoOtro: Boolean;

  constructor(private fb: FormBuilder,public dialog: MatDialog, private loginService:LoginService) { 
    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get correoControl(): FormControl{
    return this.ayudaForm.get('correo') as FormControl
  }

  get problemasControl(): FormControl{
    return this.ayudaForm.get('problemas') as FormControl
  }

  get textoOtraControl(): FormControl{
    return this.ayudaForm.get('textoOtra') as FormControl
  }

  get correoNoValido() {
    if(this.ayudaForm.get('correo')?.touched){
      if(this.ayudaForm.get('correo')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  get problemasNoValido() {
    if(this.ayudaForm.get('problemas')?.touched){
      if(this.ayudaForm.get('problemas')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  
  get textoOtraNoValido() {
    if(this.ayudaForm.get('textoOtra')?.touched){
      if(this.ayudaForm.get('textoOtra')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  crearFormulario() {
    this.ayudaForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      problemas: ['', []],
      textoOtra: ['',[]]
    })
  }

  
  crearListeners() {
    this.ayudaForm.get('correo')?.valueChanges.subscribe();
    this.ayudaForm.get('problemas')?.valueChanges.subscribe();
    this.ayudaForm.get('textoOtra')?.valueChanges.subscribe();
  }

  validar(){

    if(this.ayudaForm.controls['problemas'].value=="Otra"){
      this.banderaTextoOtro= true;
    }else{
      this.ayudaForm.controls['textoOtra'].setValue("")
      this.banderaTextoOtro=false;
    }
  }

  vaciarForm(){
    this.ayudaForm.controls['correo'].reset()
    this.ayudaForm.controls['problemas'].reset()
    this.ayudaForm.controls['textoOtra'].reset()
  }

  openDialogLoading(): void {
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '150px',
    });
  }
  
  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  enviar(){
    this.openDialogLoading();
    if(this.ayudaForm.controls['textoOtra'].value!=''){
      if(this.ayudaForm.controls['correo'].invalid==false && this.ayudaForm.controls['problemas'].value==""){
        this.closeDialogLoading();
        this.openDialog("ERROR", "Por favor verifique que todos los campos estén llenos y el correo sea válido. ")
        
      }else{
        this.loginService.ayuda(this.ayudaForm.controls['correo'].value, this.ayudaForm.controls['problemas'].value, this.ayudaForm.controls['textoOtra'].value).subscribe(resp=>{
          this.closeDialogLoading();
          this.openDialog(resp.status, resp.mensaje)
          this.vaciarForm()
        });
      }

    }else{
      if(this.ayudaForm.controls['correo'].invalid==false && this.ayudaForm.controls['problemas'].value!=""){
        
        if(this.ayudaForm.controls['problemas'].value=="Otra"){
          this.closeDialogLoading();
          this.openDialog("EERROR", "Por favor verifique que todos los campos estén llenos y el correo sea válido. ")
        }else{
          this.loginService.ayuda(this.ayudaForm.controls['correo'].value, this.ayudaForm.controls['problemas'].value, "no").subscribe(resp=>{
            this.closeDialogLoading();
            this.openDialog(resp.status, resp.mensaje)
            this.vaciarForm()
          });
        }
        
      }else{
        this.closeDialogLoading();
        this.openDialog("ERROR", "Por favor verifique que todos los campos estén llenos y el correo sea válido.")
      }
    }
    
    
  }
  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

}
