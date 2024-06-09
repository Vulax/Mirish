import { Injectable } from "@angular/core";

export interface Product {
    id: number,
    name:string,
    image:string,
    category:'Eau De Parfum'|'Eau De Toilette'|'Parfume Set',
    size:Array<'50ml'|'75ml'|'100ml'|'150ml'|'200ml'>,
    brand:string,
    price:number,
    reviews:Array<number>,
    recommended?: boolean,
    discount?: number,
}

@Injectable()
export class ProductService {
    static ProductList: Array<Product> =  [
        {
          id: 1,
          name: 'Chanel No. 5',
          image: 'assets/images/products/chanel_no_5.jpg',
          category: 'Eau De Parfum',
          size: ['50ml', '100ml'],
          brand: 'Chanel',
          price: 120,
          reviews: [5, 5, 4, 4, 5],
          recommended: true,
          discount: 10,
        },
        {
          id: 2,
          name: 'Dior Sauvage',
          image: 'assets/images/products/dior_sauvage.jpg',
          category: 'Eau De Toilette',
          size: ['75ml', '150ml'],
          brand: 'Dior',
          price: 85,
          reviews: [4, 4, 5, 3, 5],
          recommended: true,
        },
        {
          id: 3,
          name: 'Gucci Bloom',
          image: 'assets/images/products/gucci_bloom.jpg',
          category: 'Eau De Parfum',
          size: ['50ml', '100ml'],
          brand: 'Gucci',
          price: 100,
          reviews: [5, 5, 4, 5, 5],
          recommended: true,
        },
        {
          id: 4,
          name: 'Tom Ford Black Orchid',
          image: 'assets/images/products/tom_ford_black_orchid.jpg',
          category: 'Eau De Parfum',
          size: ['50ml', '100ml'],
          brand: 'Tom Ford',
          price: 150,
          reviews: [4, 4, 4, 4, 5],
          recommended: true,
        },
        {
          id: 5,
          name: 'Versace Eros',
          image: 'assets/images/products/versace_eros.jpg',
          category: 'Eau De Toilette',
          size: ['75ml', '150ml'],
          brand: 'Versace',
          price: 90,
          reviews: [5, 5, 4, 5, 4],
          discount: 15,
          recommended: true,
        },
        {
          id: 6,
          name: 'Armani Code',
          image: 'assets/images/products/armani_code.jpg',
          category: 'Eau De Parfum',
          size: ['75ml', '150ml'],
          brand: 'Armani',
          price: 95,
          reviews: [5, 4, 5, 5, 5],
        },
        {
          id: 7,
          name: 'Yves Saint Laurent Black Opium',
          image: 'assets/images/products/ysl_black_opium.jpg',
          category: 'Eau De Parfum',
          size: ['50ml', '100ml'],
          brand: 'Yves Saint Laurent',
          price: 110,
          reviews: [5, 5, 5, 4, 4],
          recommended: true,
        },
        {
          id: 8,
          name: 'Hugo Boss Bottled',
          image: 'assets/images/products/hugo_boss_bottled.jpg',
          category: 'Eau De Toilette',
          size: ['75ml', '150ml'],
          brand: 'Hugo Boss',
          price: 80,
          reviews: [4, 4, 5, 4, 5],
        },
        {
          id: 9,
          name: 'Jo Malone Wood Sage & Sea Salt',
          image: 'assets/images/products/jo_malone_wood_sage_sea_salt.jpg',
          category: 'Eau De Toilette',
          size: ['100ml'],
          brand: 'Jo Malone',
          price: 105,
          reviews: [5, 5, 5, 5, 5],
          discount: 5,
        },
        {
          id: 10,
          name: 'Paco Rabanne 1 Million',
          image: 'assets/images/products/paco_rabanne_1_million.jpg',
          category: 'Eau De Toilette',
          size: ['75ml', '150ml'],
          brand: 'Paco Rabanne',
          price: 100,
          reviews: [4, 4, 5, 5, 5],
        }
    ]
    getProductById(id:number){
      return ProductService.ProductList.find(product => product.id == id);
    }
    getProducts(){
      return this.sortByID(ProductService.ProductList);
    }
    getMaximumPrice(){
      return Math.max(...ProductService.ProductList.map(itm => itm.price));
    }
    getMinPrice(){
      return Math.min(...ProductService.ProductList.map(itm => itm.price));
    }
    getCategories(){
      let set = new Set();
      ProductService.ProductList.forEach(itm => set.add(itm.category));
      let categoriesArray:any[] = [];
      set.forEach(category => {
        categoriesArray.push(category);
      });
      return categoriesArray;
    }
    getBrand(){
      let set = new Set();
      ProductService.ProductList.forEach(itm => set.add(itm.brand));
      let manArray:any[] = [];
      set.forEach(manu => {
        manArray.push(manu);
      });
      return manArray;
    }
    getSizes(){
      let set = new Set();
      ProductService.ProductList.forEach(itm => itm.size.forEach(sze => set.add(sze)));
      let sizesArray:any[] = [];
      set.forEach(size => {
        sizesArray.push(size);
      });
      return sizesArray;
    }
    getRecommended(){
        return ProductService.ProductList.filter(pr => pr.recommended);
    }
    sortByDiscount(products:Product[]){
      return products.sort((a,b) => (b.discount === undefined ? 0:b.discount) - (a.discount === undefined ? 0:a.discount));
    }
    sortByPrice(ascending:boolean, products:Product[]){
      if(ascending){
        return products.sort((a,b) => a.price - b.price);
      } else {
        return products.sort((a,b) => b.price - a.price);
      }
    }
    sortByID(products:Product[]){
      return products.sort((a,b) => a.id - b.id);
    }
    sortByReviewsCount(ascending:boolean, products:Product[]){
      if(ascending){
        return products.sort((a,b) => a.reviews.length - b.reviews.length);
      } else {
        return products.sort((a,b) => b.reviews.length - a.reviews.length);
      }
    }
    sortByRating(ascending:boolean, products:Product[]){
      if(ascending){
        return products.sort((a,b) => (a.reviews.reduce((a,b) => {return a+b;}, 0))/a.reviews.length - (b.reviews.reduce((a,b) => {return a+b;}, 0))/b.reviews.length);
      } else {
        return products.sort((a,b) => (b.reviews.reduce((a,b) => {return a+b;}, 0))/b.reviews.length - (a.reviews.reduce((a,b) => {return a+b;}, 0))/a.reviews.length);
      }
    }
    filter(categories: string[], sizes: string[], brand: string[], minValue: number, maxValue: number, search_input:string) {
      return ProductService.ProductList.filter(product => categories.includes(product.category) && product.size.some(size => sizes.includes(size)) && brand.includes(product.brand )&& (product.price >= minValue && product.price <= maxValue) && (product.name.toLocaleLowerCase().trim().includes(search_input)));
    }
    filterByCategory(category: string){
      return ProductService.ProductList.filter(product => product.category === category);
    }
    filterByBrand(brand: string){
      return ProductService.ProductList.filter(product => product.brand === brand);
    }
}