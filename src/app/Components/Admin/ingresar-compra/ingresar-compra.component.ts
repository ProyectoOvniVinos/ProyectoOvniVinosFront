import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-ingresar-compra',
  templateUrl: './ingresar-compra.component.html',
  styleUrls: ['./ingresar-compra.component.css']
})
export class IngresarCompraComponent implements OnInit {



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
  
  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;


  registroForm !: FormGroup;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {

  }
  crearListeners() {
    this.registroForm.get('producto')?.valueChanges.subscribe(console.log);
    this.registroForm.get('cantidad')?.valueChanges.subscribe(console.log);
    this.registroForm.get('precio')?.valueChanges.subscribe(console.log);

  }

  get productoNoValido() {
    if (this.registroForm.get('producto')?.touched) {
      if (this.registroForm.get('producto')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }

  }

  get cantidadNoValido() {
    if (this.registroForm.get('cantidad')?.touched) {
      if (this.registroForm.get('cantidad')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('apellido')?.invalid && this.registroForm.get('apellido')?.touched;
  }
  get precioNoValido() {
    if (this.registroForm.get('precio')?.touched) {
      if (this.registroForm.get('precio')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
    //return this.registroForm.get('direccion')?.invalid && this.registroForm.get('direccion')?.touched;
  }
  
  crearFormulario() {
    this.registroForm = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: [ [Validators.required]]
    })
  }

  ingresar(){
    console.log(this.registroForm);
    

  }


}
