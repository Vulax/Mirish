import { AfterViewInit,  Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../item/product.service';
import { Router } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  @ViewChild('mainimg') mainimg: ElementRef<HTMLImageElement>;
  @ViewChild('header') header: ElementRef<HTMLElement>;
  items = [
    { image: 'assets/images/1.jpg' }
  ];
  constructor(public productService: ProductService, private router:Router, public userService: UserService, @Inject(Renderer2) public renderer: Renderer2){
  }

  setHeight() {
    return () => {
      this.renderer.setStyle(this.header.nativeElement, 'height', this.mainimg.nativeElement.offsetHeight + 'px')
    }
  }

  ngAfterViewInit(): void {
    this.renderer.listen(window, 'resize', this.setHeight())
    this.renderer.listen(this.mainimg.nativeElement, 'load', this.setHeight())
  }
}
