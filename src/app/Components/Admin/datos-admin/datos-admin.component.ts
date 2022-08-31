import { Component, OnInit } from '@angular/core';
import { AdministradorModel } from '../../../Models/Administrador.model';
import { AdminService } from '../../../Services/admin.service';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-datos-admin',
  templateUrl: './datos-admin.component.html',
  styleUrls: ['./datos-admin.component.css']
})
export class DatosAdminComponent implements OnInit {

  admin: AdministradorModel;
  usuario;
  constructor(private adminService: AdminService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.usuario = this.loginService.usuario;
    this.adminService.getAdminById(this.usuario.correo).subscribe(admin => {
      this.admin = admin;
    });
  }

}
