import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidos'
})
export class PedidosPipe implements PipeTransform {

  transform(value: string): unknown {
    let salida:string = '';
    if(value == '1'){
      salida = 'pendiente'
    }else if(value == '2'){
      salida = 'en proceso';
    }else if(value == '3'){
      salida = 'completado';
    }else{
      salida = 'cancelado';
    }
    return salida;
  }

}
