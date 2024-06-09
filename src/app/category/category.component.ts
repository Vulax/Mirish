import { Component, Input, inject } from '@angular/core';
import { Product, ProductService } from '../item/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category?: string;
  private activatedRoute = inject(ActivatedRoute);
  sorting_option = 'default';
  search_input = '';
  minValueFilter:number = 0;
  maxValueFilter:number = 500;
  minItemPrice:number = 500;
  maximumItemPrice:number = 500;
  products!: Product[];
  categories: string[] = [];
  selectedCategories: string[] = [];
  sizes: string[] = [];
  selectedSizes: string[] = [];
  brand: string[] = [];
  selectedBrand: string[] = [];
  constructor(public productService: ProductService){
    this.products = productService.getProducts();
    this.categories = productService.getCategories();
    this.sizes = productService.getSizes();
    this.brand = productService.getBrand();
    this.minItemPrice = productService.getMinPrice();
    this.minValueFilter = this.minItemPrice;
    this.maximumItemPrice = productService.getMaximumPrice();
    this.maxValueFilter = this.maximumItemPrice;
    this.selectedSizes = this.sizes;
    this.selectedBrand = this.brand;
    this.category = this.activatedRoute.snapshot.queryParamMap.get('category')!;
    if(this.category !== null){
      this.selectedCategories.push(this.category);
      this.filterMe();
    } else {
      this.selectedCategories = this.categories;
    }
  }
  isManSelected(man: string): boolean {
    return this.selectedBrand.includes(man);
  }
  toggleMan(man: string): void {
    if (this.isManSelected(man)) {
      this.selectedBrand = this.selectedBrand.filter(c => c !== man);
    } else {
      this.selectedBrand.push(man);
    }
    this.filterMe();
  }
  isSizeSelected(size: string): boolean {
    return this.selectedSizes.includes(size);
  }
  toggleSize(size: string): void {
    if (this.isSizeSelected(size)) {
      this.selectedSizes = this.selectedSizes.filter(c => c !== size);
    } else {
      this.selectedSizes.push(size);
    }
    this.filterMe();
  }
  isCategorySelected(category: string): boolean {
    return this.selectedCategories.includes(category);
  }
  toggleCategory(category: string): void {
    if (this.isCategorySelected(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.filterMe();
  }
  togglePrice(){
    this.filterMe();
  }
  search(){
    this.filterMe();
  }
  filterMe(){ 
    this.products = this.productService.filter(this.selectedCategories, this.selectedSizes, this.selectedBrand, this.minValueFilter, this.maxValueFilter, this.search_input.toLocaleLowerCase().trim());
    this.sort_by();
  }
  sort_by(){

    this.products = this.productService.filter(this.selectedCategories, this.selectedSizes, this.selectedBrand, this.minValueFilter, this.maxValueFilter, this.search_input.toLocaleLowerCase().trim());
    if (this.sorting_option === 'default') {
      this.products = this.productService.sortByID(this.products);
    }
    else if (this.sorting_option === 'option11') {
      this.products = this.productService.sortByDiscount(this.products);
    }
    else if (this.sorting_option === 'option3') {
      this.products = this.productService.sortByPrice(true, this.products);
    }
    else if (this.sorting_option === 'option4') {
      this.products = this.productService.sortByPrice(false, this.products);
    }
    else if (this.sorting_option === 'option7') {
      this.products = this.productService.sortByRating(true, this.products);
    }
    else if (this.sorting_option === 'option8') {
      this.products = this.productService.sortByRating(false, this.products);
    }
    else if (this.sorting_option === 'option9') {
      this.products = this.productService.sortByReviewsCount(true, this.products);
    }
    else if (this.sorting_option === 'option10') {
      this.products = this.productService.sortByReviewsCount(false, this.products);
    }
    else {
      this.products = this.productService.sortByID(this.products);
    }
  }
}
