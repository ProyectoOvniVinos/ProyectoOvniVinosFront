import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  url: "https://api.cloudinary.com/v1_1/dqbrhsn8x/image/upload/"
  img: CloudinaryImage;

  constructor(private http: HttpClient) { }

  subir(imagen: File){
      console.log(imagen);
      this.img   
      const data= new FormData();
      data.append('file',imagen);
      data.append('upload_preset','imagenes_proyecto')
      data.append('cloud_name','dqbrhsn8x')


      return this.http.post("https://api.cloudinary.com/v1_1/dqbrhsn8x/image/upload/",data);

  }
}
