import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';
import { InventarioGService } from '../../../Services/inventario-g.service';
import { ModalInteraccionComponent } from '../../Modal/modal-interaccion/modal-interaccion.component';
import { ProductoService } from '../../../Services/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoModel } from '../../../Models/Producto.model';
import { ImagenService } from '../../../Services/imagen.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  
  productos: ProductoModel[] = [];
  loading: boolean;

  producto: ProductoModel={
    codigoProducto: 0,
    nombreProducto: '',
    precioProducto: 0,
    precioProductoProveedor: 0,
    descripcionProducto: '',
    fotoProducto: '',
    estado: ''
  };

  botonAccion = "Deshabilitar"
  boton:string = "Registrar"
  titulo:string = "CREAR PRODUCTO";
  registroProductoForm !: FormGroup;
  private fotoSeleccionada !: File;

  constructor(private router: Router,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private imagenServicio: ImagenService,
              public dialog: MatDialog,
              public servicioProducto: ProductoService,
              public servicioInventario: InventarioGService) {
    this.crearFormulario();
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  openDialogInteraction(titleNew: string, mensajeNew: string):void{
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if(result==true){
        this.openDialogLoading();
        console.log("confirmo");
        this.deshabilitarProducto();        
      }else{
        console.log("en else");
        
      }
    });
  }

  openDialogInteractionTwo(titleNew: string, mensajeNew: string):void{
    this.closeDialogLoading()
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
        this.openDialogLoading();
        this.habilitarProducto();        
      }else{
        console.log("en else");
        
      }
    });
  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      let id  = params['id'];

      if(id){
        this.openDialogLoading()
        this.titulo = "EDITAR PRODUCTO";
        this.boton = "Editar";
        this.servicioProducto.getProductById(id).subscribe((producto:ProductoModel)=>{
          this.producto=producto;
          this.fotoSeleccionada=null;
          this.registroProductoForm.controls["nombreProducto"].setValue(this.producto.nombreProducto);
          this.registroProductoForm.controls["precioProducto"].setValue(this.producto.precioProducto);
          this.registroProductoForm.controls["precioProveedor"].setValue(this.producto.precioProductoProveedor);
          this.registroProductoForm.controls["descripcionProducto"].setValue(this.producto.descripcionProducto);
          console.log(this.producto);
          
          if(this.producto.estado==="1"){
            this.botonAccion="Deshabilitar";
          }else{
            this.botonAccion="Habilitar"
          }
          this.closeDialogLoading();
        })
        
      }
    })

  }

  cargarData(){
    this.registroProductoForm.reset({

      nombreProducto : this.producto.nombreProducto,
      precioProducto : this.producto.precioProducto,
      precioProveedor : this.producto.precioProductoProveedor,
      descripcionProducto : this.producto.descripcionProducto,
    });
    
  }

  iniciarProceso(){

    this.openDialogLoading()
    if(this.boton=="Registrar"){
      if(!this.registroProductoForm.invalid){
        this.registrar();
      }else{
        this.closeDialogLoading();
        this.openDialog("ERROR","Verifique que todos los campos estén diligenciados. ")
      }
    }else{
      if(!this.registroProductoForm.invalid){
        this.actualizar();
      }else{
        this.closeDialogLoading();
        this.openDialog("ERROR","Verifique que todos los campos estén diligenciados. ")
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
      console.log("Por favor seleccione una foto. ")
      this.closeDialogLoading();
      this.openDialog("ADVERTENCIA","Por favor seleccione una foto. ")
    }else{

      this.imagenServicio.subir(this.fotoSeleccionada).subscribe( (response:any) => {
        if(response){
          const productoForm = this.registroProductoForm.value;
          let precioProducto = Number(productoForm.precioProducto);
          let precioProveedor = Number(productoForm.precioProveedor);
          this.producto.nombreProducto = productoForm.nombreProducto;
          this.producto.precioProducto = precioProducto;
          this.producto.precioProductoProveedor = precioProveedor;
          this.producto.descripcionProducto = productoForm.descripcionProducto;
          this.producto.fotoProducto = response.url;

          this.servicioProducto.getProductByName(this.producto.nombreProducto).subscribe(productos=> {
            this.closeDialogLoading();
            this.openDialog("ERROR","Lo sentimos, este producto ya existe. ")
          },err=>{

            this.servicioProducto.createProduct(this.producto).subscribe(response=>{
              this.closeDialogLoading();
              this.router.navigate(['/productos'])
              this.openDialog("¡¡ÉXITO!!","El producto se ha agregado satisfactoriamente. ")
            },err=>{
              this.closeDialogLoading();
              this.openDialog("ERROR","Lo sentimos, no se pudo agregar el producto. Inténtalo de nuevo. ")
              console.log(err.status);
              
            });
          })
        }
      },err=>{
        this.closeDialogLoading();
        this.openDialog("ERROR","Lo sentimos, no se pudo alojar la imagen")
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
      codigoProducto: 0,
      nombreProducto: '',
      precioProducto: 0,
      precioProductoProveedor: 0,
      descripcionProducto: '',
      fotoProducto: ''
    };;
    let precioProducto = Number(productoForm.precioProducto);
    let precioProveedor = Number(productoForm.precioProveedor);
    productoNew.codigoProducto = this.producto.codigoProducto;
    productoNew.nombreProducto = productoForm.nombreProducto;
    productoNew.precioProducto = precioProducto;
    productoNew.precioProductoProveedor = precioProveedor;
    productoNew.descripcionProducto = productoForm.descripcionProducto;
    productoNew.fotoProducto = this.producto.fotoProducto;

    this.servicioProducto.updateProduct(productoNew.codigoProducto, productoNew).subscribe((response:any) => {
      this.closeDialogLoading();
      this.router.navigate(['/productos'])
      this.openDialog("¡¡ÉXITO!!","El producto se ha actualizado correctamente. ")
    }, err => {
      this.closeDialogLoading();
      this.openDialog("ERROR","Lo sentimos, los datos no se actualizaron. Inténtalo de nuevo. ")
    })
  }

  actualizarConImagen(){
    
    this.imagenServicio.subir(this.fotoSeleccionada).subscribe( (response:any) => {
      if(response){
        const productoForm = this.registroProductoForm.value;
        let productoNew: ProductoModel = {
          codigoProducto: 0,
          nombreProducto: '',
          precioProducto: 0,
          precioProductoProveedor: 0,
          descripcionProducto: '',
          fotoProducto: ''
        };;
        let precioProducto = Number(productoForm.precioProducto);
        let precioProveedor = Number(productoForm.precioProveedor);
        productoNew.codigoProducto = this.producto.codigoProducto;
        productoNew.nombreProducto = productoForm.nombreProducto;
        productoNew.precioProducto = precioProducto;
        productoNew.precioProductoProveedor = precioProveedor;
        productoNew.descripcionProducto = productoForm.descripcionProducto;
        productoNew.fotoProducto = response.url;

        this.servicioProducto.updateProduct(productoNew.codigoProducto, productoNew).subscribe((response:any) => {
          this.closeDialogLoading();
          this.router.navigate(['/productos'])
          this.openDialog("¡¡ÉXITO!!","El producto se ha actualizado correctamente. ")
          console.log(productoNew);
          
        },err=>{
          this.closeDialogLoading();
          this.openDialog("ERROR","Lo sentimos, los datos no se actualizaron. Inténtalo de nuevo. ")
        })

      }
    });
  }

  deshabilitar(id: number){

    this.openDialogLoading()
    if(this.botonAccion=="Deshabilitar"){
      this.servicioInventario.getInventarioGeneralByProducto(id).subscribe((res:any) => {
        if(res.cantidadProducto>0){
          this.closeDialogLoading()
          this.openDialogInteraction("ADVERTENCIA",`Existen aún ${res.cantidadProducto} productos, ¿Estás seguro de deshabilitar este producto?`)
        }else{
          this.closeDialogLoading()
          this.openDialogInteraction("ADVERTENCIA", "¿Estás seguro de desahabilitar este producto?")
        }
      },err =>{
        this.closeDialogLoading();
        this.openDialog("Advertencia!!",`${err.error.mensaje}`)
        this.router.navigate(['/productos'])
      })
    }else{
      this.closeDialogLoading()
      this.openDialogInteractionTwo("ADVERTENCIA","¿Estás seguro de habilitar este producto?")

      
    }


  }

  deshabilitarProducto(){
    let codigo= this.producto.codigoProducto;
    this.servicioProducto.deshabilitarProduct(codigo).subscribe(res=>{
      this.closeDialogLoading()
      this.openDialog("¡¡ÉXITO!!","Se ha desahabilitado correctamente el producto. ")
      this.router.navigate(['/productos'])
    }, err => {
      console.log(err);
      
    })
  }

  habilitarProducto(){
    let codigo= this.producto.codigoProducto;
    this.servicioProducto.deshabilitarProduct(codigo).subscribe(res=>{
      this.closeDialogLoading();
      this.openDialog("¡¡ÉXITO!!","Se ha habilitado correctamente el producto. ")
      this.router.navigate(['/productos'])
    }, err => {
      console.log(err);
      
    })
  }

  crearFormulario(){
    this.registroProductoForm = this.fb.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(3)]],
      precioProducto: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      precioProveedor:['', [Validators.required, Validators.pattern(/^[0-9]/)]],
      descripcionProducto:['',[Validators.required, Validators.maxLength(200)]],
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
