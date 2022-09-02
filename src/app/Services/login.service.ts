import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  private _usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario():any{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && localStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(localStorage.getItem('usuario'));
      return this._usuario;
    }
    return null;
  }

  public get token():string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && localStorage.getItem('token') != null){
      this._token = localStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(username:string, password:string):Observable<any>{
    const urlEnpoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('ovniVinos' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic '+ credenciales}); 
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', username);
    params.set('password', password);
    return this.http.post<any>(urlEnpoint,params.toString(),{headers:httpHeaders});
  }

  guardarUsuario(access_token: string): void{
    let payload = this.obtenerDatosToken(access_token);
    let usuario = {
      correo: payload.correo,
      rol: payload.authorities[0]
    };
    this._usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(access_token: string): void{
    this._token = access_token;
    localStorage.setItem('token', access_token);
  }

  obtenerDatosToken(accessToken:string):any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  hasRole(role:string):boolean{
    if(this.usuario != null){
      if(this.usuario.rol == role){
        return true;
      }
    }
    return false;
  }
  
  logout():void{
    this._token = null;
    this._usuario = null;
    localStorage.clear();
  }

  ayuda(email:string,problema:string,descripcion:string){
    let url = `http://localhost:8080/apiCliente/ayuda/${email}/${problema}/${descripcion}`
    return this.http.get<any>(url);
  }

}
