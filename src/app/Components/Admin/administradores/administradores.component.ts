import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdministradorModel } from '../../../Models/Administrador.model'
import { AdminService } from '../../../Services/admin.service';
import { ModalInteraccionComponent } from '../../Modal/modal-interaccion/modal-interaccion.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  administradores: AdministradorModel[] = [];
  bandera: Boolean;

  constructor(private serviceAdmin: AdminService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerAdmins();
  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  openDialogInteraction(titleNew: string, mensajeNew: string, correo:string, estado:string):void{
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
        this.openDialogLoading();
        this.deshabilitarAdmin(correo,estado);        
      }else{
        
      }
    });
  }

  obtenerAdmins(){
    this.serviceAdmin.getAllAdmins().subscribe(administradores => {
      this.bandera=true
      this.administradores=administradores.filter(administrador => administrador.correoAdmin != 'crissis2004@gmail.com')

      if(this.administradores.length==0){
        this.bandera=false;
      }else{
        this.sorteando();
        this.bandera=true;
      }
    })
  }

  deshabilitar(correo:string, estado:string){

    if(estado=="1"){
      this.openDialogInteraction("ADVERTENCIA","¿Estás seguro de deshabilitar a este administrador?",correo,estado)
    }else{
      this.openDialogInteraction("ADVERTENCIA","¿Estás seguro de habilitar a este administrador?",correo, estado)
    }
  }

  deshabilitarAdmin(correo:string, estado:string){
    this.serviceAdmin.UpdateEstado(correo).subscribe(res=> {
      this.administradores = this.administradores.map(admin => {
        if(estado=="1"){
          if(admin.correoAdmin==correo){
            admin.estado="0";
            return admin
          }
          return admin
        }else{
          if(admin.correoAdmin==correo){
            admin.estado="1";
            return admin
          }
          return admin
        }
      })
      this.sorteando()
      this.closeDialogLoading();
      
    },err => {
      this.closeDialogLoading();
      
    })
  }

  sorteando(){
    this.administradores.sort(function (a, b) {
      // A va primero que B
      if (a.estado > b.estado)
          return -1;
      // B va primero que A
      else if (a.estado < b.estado)
          return 1;
      // A y B son iguales
      else 
          return 0;
    });
  }

}
