import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private _bandera: string;

  constructor() { }


  public get bandera():any{
    if(this._bandera=="" || this._bandera==null || this._bandera==undefined){
      this._bandera="";
      return this._bandera;
    }else{
      return this._bandera;
    }
  }

  guardarBandera(bandera:string): void{
    if(this.bandera){
      localStorage.removeItem('bandera');
    }
    
    localStorage.setItem('bandera', bandera);
    this._bandera=localStorage.getItem('bandera');
  }

}
