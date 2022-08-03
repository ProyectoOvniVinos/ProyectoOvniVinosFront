import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { ImagenService } from 'src/app/Services/imagen.service';

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
    imagen: ''
  };

<<<<<<< HEAD

  boton:string = "Registrar"
=======
  boton:string = "registrar"
>>>>>>> 88c9d95f95a158e5a879834129ad507222e5e65c
  titulo:string = "Crear Producto";
  registroProductoForm !: FormGroup;
  private fotoSeleccionada !: File;

  constructor(private router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private imagenServicio: ImagenService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      let id  = params['id'];

/*       if(id){
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
      } */
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
        this.producto.imagen = foto;
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
      precioProducto: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      precioProveedor:['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      descripcionProducto:['',[Validators.required]],
      imagenProducto: ['', []]
    })
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      this.fotoSeleccionada = null;
    }  
  }
  
  subirFoto():string{
    let url: string;
    if(!this.fotoSeleccionada){
      console.log("por favor seleccionar una foto")
      url = "";
    }else{
      console.log("listo para subir")
      this.imagenServicio.subir(this.fotoSeleccionada).subscribe( (response:any) => {
        if(response){
          url=response.url
        }
      });
    }
    
    return url;

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

  registrar(){
    console.log(this.registroProductoForm.get('imagenProducto'));
    
  }

}
