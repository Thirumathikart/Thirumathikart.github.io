import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private products: any[]= [];

  setProductData(data: any) {
    this.products = data;
  }

  getProductData() {
    return this.products;
  }
}