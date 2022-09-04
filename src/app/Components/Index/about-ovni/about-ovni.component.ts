import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-ovni',
  templateUrl: './about-ovni.component.html',
  styleUrls: ['./about-ovni.component.css']
})
export class AboutOvniComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("en about");
    
  }

}
