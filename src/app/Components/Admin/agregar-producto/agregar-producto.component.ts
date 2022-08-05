import { ProductoService } from 'src/app/Services/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { ImagenService } from 'src/app/Services/imagen.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  
  productos: ProductoModel[] = [];

  producto: ProductoModel={
    codigo_producto: 0,
    nombre_producto: '',
    precio_producto: 0,
    precio_producto_proveedor: 0,
    descripcion_producto: '',
    imagen: ''
  };


  boton:string = "Registrar"
  titulo:string = "Crear Producto";
  registroProductoForm !: FormGroup;
  private fotoSeleccionada !: File;

  constructor(private router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private imagenServicio: ImagenService,
              public dialog: MatDialog,
              public servicioProducto: ProductoService) {
    this.crearFormulario();
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      let id  = params['id'];

      if(id){
        this.titulo = "Editar Producto";
        this.boton = "Editar";
        this.servicioProducto.getProductById(id).subscribe((producto:ProductoModel)=>{
          this.producto=producto;
          this.fotoSeleccionada=null;
        })
      }
    })

  }

  cargarData(){
    this.registroProductoForm.reset({

      nombreProducto : this.producto.nombre_producto,
      precioProducto : this.producto.precio_producto,
      precioProveedor : this.producto.precio_producto_proveedor,
      descripcionProducto : this.producto.descripcion_producto,
    });
    
  }

  iniciarProceso(){

    if(this.boton=="Registrar"){
      if(!this.registroProductoForm.invalid){
        this.registrar();
      }else{
        this.openDialog("Error","Verifique los campos por favor!!")
      }
    }else{
      if(!this.registroProductoForm.invalid){
        this.actualizar();
      }else{
        this.openDialog("Error","Verifique los campos por favor!!")
      }
    }


  }

  irProductos(){
    this.router.navigate(['/productos'])
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
    }  
  }

  registrar(){
    if(!this.fotoSeleccionada){
      console.log("por favor seleccionar una foto")
      this.openDialog("Advertencia","Porfavor seleccione una Foto")
    }else{

      this.imagenServicio.subir(this.fotoSeleccionada).subscribe( (response:any) => {
        if(response){
          const productoForm = this.registroProductoForm.value;
          let precioProducto = Number(productoForm.precioProducto);
          let precioProveedor = Number(productoForm.precioProveedor);
          this.producto.nombre_producto = productoForm.nombreProducto;
          this.producto.precio_producto = precioProducto;
          this.producto.precio_producto_proveedor = precioProveedor;
          this.producto.descripcion_producto = productoForm.descripcionProducto;
          this.producto.imagen = response.url;

          this.servicioProducto.getProductByName(this.producto.nombre_producto).subscribe(productos=> {
            this.openDialog("Error","Este producto ya existe!!")
          },err=>{

            this.servicioProducto.createProduct(this.producto).subscribe(response=>{
              this.router.navigate(['/productos'])
              this.openDialog("Exito!!","Se ha agregado correctamente el Producto")
            },err=>{
              this.openDialog("Error","Ha habido un error intentelo de Nuevo")
              console.log(err.status);
              
            });
          })
        }
      });
    }
  }

  actualizar(){
    if(!this.fotoSeleccionada){
      this.actualizarSinImagen();
    }else{
      this.actualizarConImagen();
    }
  }
  
  actualizarSinImagen(){
    const productoForm = this.registroProductoForm.value;
    let productoNew: ProductoModel = {
      codigo_producto: 0,
      nombre_producto: '',
      precio_producto: 0,
      precio_producto_proveedor: 0,
      descripcion_producto: '',
      imagen: ''
    };;
    let precioProducto = Number(productoForm.precioProducto);
    let precioProveedor = Number(productoForm.precioProveedor);
    productoNew.codigo_producto = this.producto.codigo_producto;
    productoNew.nombre_producto = productoForm.nombreProducto;
    productoNew.precio_producto = precioProducto;
    productoNew.precio_producto_proveedor = precioProveedor;
    productoNew.descripcion_producto = productoForm.descripcionProducto;
    productoNew.imagen = this.producto.imagen;

    this.servicioProducto.updateProduct(productoNew.codigo_producto, productoNew).subscribe((response:any) => {
      this.router.navigate(['/productos'])
      this.openDialog("Exito!!","Se ha actualizado correctamente el Producto")
    }, err => {
      this.openDialog("Error","Ha habido un error intentelo de Nuevo")
    })
  }

  actualizarConImagen(){
    console.log("con imagen");
    
    this.imagenServicio.subir(this.fotoSeleccionada).subscribe( (response:any) => {
      if(response){
        const productoForm = this.registroProductoForm.value;
        let productoNew: ProductoModel = {
          codigo_producto: 0,
          nombre_producto: '',
          precio_producto: 0,
          precio_producto_proveedor: 0,
          descripcion_producto: '',
          imagen: ''
        };;
        let precioProducto = Number(productoForm.precioProducto);
        let precioProveedor = Number(productoForm.precioProveedor);
        productoNew.codigo_producto = this.producto.codigo_producto;
        productoNew.nombre_producto = productoForm.nombreProducto;
        productoNew.precio_producto = precioProducto;
        productoNew.precio_producto_proveedor = precioProveedor;
        productoNew.descripcion_producto = productoForm.descripcionProducto;
        productoNew.imagen = response.url;

        this.servicioProducto.updateProduct(productoNew.codigo_producto, productoNew).subscribe((response:any) => {
          this.router.navigate(['/productos'])
          this.openDialog("Exito!!","Se ha actualizado correctamente el Producto")
          console.log(productoNew);
          
        },err=>{
          this.openDialog("Error","Ha habido un error intentelo de Nuevo")
        })

      }
    });
  }
  crearFormulario(){
    this.registroProductoForm = this.fb.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(3)]],
      precioProducto: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      precioProveedor:['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      descripcionProducto:['',[Validators.required]],
      imagenProducto: ['', []]
    })
  }
  get nombreProductoNoValido() {
    if(this.registroProductoForm.get('nombreProducto')?.touched){
      if(this.registroProductoForm.get('nombreProducto')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }
  get precioProductoNoValido() {
    if(this.registroProductoForm.get('precioProducto')?.touched){
      try {
        let numero = Number(this.registroProductoForm.get('precioProducto')?.value);
        if(numero){
          if(this.registroProductoForm.get('precioProducto')?.invalid == false){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      } catch (error) {
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('celular')?.invalid && this.registroForm.get('celular')?.touched;
  }
  get precioProveedorNoValido() {
    if(this.registroProductoForm.get('precioProveedor')?.touched){
      try {
        let numero = Number(this.registroProductoForm.get('precioProveedor')?.value);
        if(numero){
          if(this.registroProductoForm.get('precioProveedor')?.invalid == false){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      } catch (error) {
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('celular')?.invalid && this.registroForm.get('celular')?.touched;
  }
  get descripcionProductoNoValido() {
    if(this.registroProductoForm.get('descripcionProducto')?.touched){
      if(this.registroProductoForm.get('descripcionProducto')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }
  get nombreControl(): FormControl{
    return this.registroProductoForm.get('nombreProducto') as FormControl
  }
  get precioControl(): FormControl{
    return this.registroProductoForm.get('precioProducto') as FormControl
  }
  get proveedorControl(): FormControl{
    return this.registroProductoForm.get('precioProveedor') as FormControl
  }
  get imagenControl(): FormControl{
    return this.registroProductoForm.get('imagenProducto') as FormControl
  }
  get descripcionControl(): FormControl{
    return this.registroProductoForm.get('descripcionProducto') as FormControl
  }
}
