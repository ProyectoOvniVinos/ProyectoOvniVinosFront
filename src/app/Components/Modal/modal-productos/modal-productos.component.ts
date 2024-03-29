import { ProductoModel } from '../../../Models/Producto.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';
import { ClienteService } from '../../../Services/cliente.service';
import { CarritoService } from '../../../Services/carrito.service';
import { ProductoService } from '../../../Services/producto.service';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  productoRecomendado: ProductoModel;
  productos: ProductoModel[] = [];
  bandera:Boolean;

  constructor(private productoService: ProductoService,
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public inventario:Inventario_generalModel,
    public clienteService:ClienteService,
    public carritoService:CarritoService,
    public dialog: MatDialog,
    public loginService: LoginService){}


  onNoClick(): void{
    this.dialogRef.close();
  }

  agregar(inventario: Inventario_generalModel){
    let list:Object={
      resultado:true,
      inventarioG:inventario
    }
    this.dialogRef.close(list)
  }

  dialogo(producto: ProductoModel): void{
    this.productoService.getProductsInventario().subscribe(inventario => {
      inventario.forEach(inven => {
        if(inven.codigoProducto.codigoProducto==producto.codigoProducto){
          this.inventario=inven;
        }
      })
      this.filtrando()
    });
  }

  openDialog(inventario: Inventario_generalModel): void {
    const pageWidth  = document.documentElement.scrollWidth;
    let width='50%'
    if(pageWidth<=1400){
        width='70%'
    }
    this.dialog.closeAll()
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: width,
      data: inventario,
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
/*         this.agregar(inventario.codigoProducto);  */
        
      }else{
        
      }
    });
  }

  ngOnInit(): void {

    if(this.inventario.cantidadProducto==0){
      this.bandera=false;
    }
    
    this.productoService.getProductsInventario().subscribe(inventario => {
      inventario.forEach(inven => {
        this.productos.push(inven.codigoProducto);
      })
      this.filtrando();
      this.bandera=true
    });
      
  }

  filtrando(){

    let productosRecomendados = this.productos.filter(
      (friend) => {
        let ok = true;
        for (let i = 0; i < this.productos.length && ok; i++) { // Corta cuando no hay mas productos o cuando ya se encontró uno
          if (this.inventario.codigoProducto.codigoProducto == friend.codigoProducto)
            ok = false;
        }
        return ok;
    })
    
    let posicion: number = Math.floor(Math.random()*productosRecomendados.length)
    this.productoRecomendado = productosRecomendados[posicion];

    
  }
  

}
