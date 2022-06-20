import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  
  producto: ProductoModel={
    codigo_producto: 0,
    nombre_producto: '',
    precio_producto: 0,
    precio_productoProveedor: 0,
    descripcion_producto: '',
    imagen: '../../../../assets/TEMPORALES/vino1.jpg'
  };
  boton:string = "registrar"
  titulo:string = "Crear Producto";
  registroProductoForm !: FormGroup;
  private fotoSeleccionada !: File;
  productos: ProductoModel[] = [
    {
      codigo_producto: 1,
      nombre_producto: 'Vino Abocado',
      precio_producto: 13000,
      precio_productoProveedor: 6000,
      descripcion_producto: 'Delicioso Vino Dulce',
      imagen: '../../../../assets/TEMPORALES/vino1.jpg'
    }, {
      codigo_producto: 2,
      nombre_producto: 'Vino tinto',
      precio_producto: 13000,
      precio_productoProveedor: 6000,
      descripcion_producto: 'Delicioso Vino no tan Dulce',
      imagen: '../../../../assets/TEMPORALES/vino2.jpg'
    }, {
      codigo_producto: 3,
      nombre_producto: 'Nectar de uva',
      precio_producto: 10000,
      precio_productoProveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      imagen: '../../../../assets/TEMPORALES/vino3.jpg'
    },
  ];

  constructor(private router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      let id  = params['id'];
      console.log(id);
      if(id){
        this.titulo = "Editar Producto";
        this.boton = "Editar";
        this.productos.forEach(producto => {
          if(producto.codigo_producto == id){
            this.producto = producto;
            this.fotoSeleccionada = null;
            this.cargarData();
            console.log(this.producto);
          }
        });
      }
    })
  }

  cargarData(){
    this.registroProductoForm.reset({

      nombreProducto : this.producto.nombre_producto,
      precioProducto : this.producto.precio_producto,
      precioProveedor : this.producto.precio_productoProveedor,
      descripcionProducto : this.producto.descripcion_producto,
    });
    
  }

  crearProducto(){
    if(!this.registroProductoForm.invalid){
      

      let foto = this.subirFoto();
      if(foto){

        console.log("crear objeto");
        const producto = this.registroProductoForm.value;
        let precioP = Number(producto.precioProducto);
        let precioPp = Number(producto.precioProveedor);
        this.producto.nombre_producto = producto.nombreProducto;
        this.producto.precio_producto = precioP;
        this.producto.precio_productoProveedor = precioPp;
        this.producto.descripcion_producto = producto.descripcionProducto;
        console.log(this.producto);
      }else{
        console.log("tiene que seleccionar una foto");
      }
    }else{
      console.log("esta malo el formulario")
      console.log(this.registroProductoForm);
    }
  }

  irProductos(){
    this.router.navigate(['/productos'])
  }

  crearFormulario(){
    this.registroProductoForm = this.fb.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(3)]],
      precioProducto: ['', [Validators.required]],
      precioProveedor:['', [Validators.required]],
      descripcionProducto:['',[Validators.required, Validators.minLength(5)]],
      imagenProducto: ['', []]
    })
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
    }  
  }
  
  subirFoto():boolean{
    let subio: boolean;
    if(!this.fotoSeleccionada){
      console.log("por favor seleccionar una foto")
      subio = false;
    }else{
      console.log("listo para subir")
      subio = true;
    }
    
    return subio;

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

}
