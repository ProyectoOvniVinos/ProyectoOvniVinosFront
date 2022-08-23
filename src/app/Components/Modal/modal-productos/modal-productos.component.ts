import { ProductoModel } from 'src/app/Models/Producto.model';
import { DialogData } from './../DialogData';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import Swiper, { Autoplay } from 'swiper';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  productoRecomendado: ProductoModel;
  productos: ProductoModel[] = [];
  productosRecomendados:ProductoModel[] = [];
  bandera:Boolean = true;

  constructor(private productoService: ProductoService,
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public inventario:Inventario_generalModel,
    public clienteService:ClienteService,
    public carritoService:CarritoService,
    public dialog: MatDialog){}


  onNoClick(): void{
    this.dialogRef.close();
  }

  dialogo(producto: ProductoModel): void{
    this.productoService.getProductsInventario().subscribe(inventario => {
      inventario.forEach(inven => {
        if(inven.codigoProducto.codigoProducto==producto.codigoProducto){
          this.inventario=inven;
          this.filtrando()
        }
      })
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
      console.log(`Dialog result: ${result}`); // Pizza!
      if(result==true){
/*         this.agregar(inventario.codigoProducto);  */
        
      }else{
        console.log("en else");
        
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
    });
      
  }

  filtrando(){
    
    this.productos.forEach( producto => {
      if(producto.codigoProducto == this.inventario.codigoProducto.codigoProducto){
      }else{
        this.productosRecomendados.push(producto);
      }
    })

    let posicion: number = Math.floor(Math.random()*this.productosRecomendados.length)
    this.productoRecomendado = this.productosRecomendados[posicion];

    
  }
  

}
