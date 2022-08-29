import { Component, OnInit } from '@angular/core';
import { AdministradorModel } from 'src/app/Models/Administrador.model';
import { AdminService } from 'src/app/Services/admin.service';
import { LoginService } from 'src/app/Services/login.service';

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
