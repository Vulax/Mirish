import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../cart/cart.service';
import { UserService } from '../auth/user.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
parseInt=parseInt
  rate!:string;
  average?: string;
  sizes: string[] = ['50ml','75ml','100ml','150ml','200ml'];
  size?: string;
  @Input() product!: Product;
  @Input() less_place!: boolean;
  constructor(private _snackBar: MatSnackBar, public userService: UserService, public cartService: CartService){}
  ngOnInit(): void {
    this.average = this.calculateAverage(this.product.reviews);
  }
  addToCart(){
    if(this.size === undefined){
      this.openSnack("Choose size.", "Close");
    } else {
      if(this.userService.currentUser !== undefined){
        this.cartService.addToCart(this.userService.currentUser.id, this.product, this.size);
        this.openSnack("Added to cart.", "Close");
      } else {
        this.openSnack("Create an account.", "Close");
      }
    }
  }
  openSnack(message:string, action:string){
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
  checkSize(size:any){
    type sze = '50ml'|'75ml'|'100ml'|'150ml'|'200ml';
    if(this.product.size.includes(size as sze)){
      return true;
    } else {
      return false;
    }
  }
  calculateAverage(reviews: number[]): string {
    if (reviews.length === 0) {
      return 'N/A';
    }
    const average = reviews.reduce((acc, val) => acc + val, 0) / reviews.length;
    this.rate = average.toFixed(1);
    return average.toFixed(1);
  }
}