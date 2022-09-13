import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidos'
})
export class PedidosPipe implements PipeTransform {

  transform(value: string): unknown {
    let salida:string = '';
    if(value == '1'){
      salida = 'Pendiente'
    }else if(value == '2'){
      salida = 'En proceso';
    }else if(value == '3'){
      salida = 'Completado';
    }else{
      salida = 'Cancelado';
    }
    return salida;
  }

}
