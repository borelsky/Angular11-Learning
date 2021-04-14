import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductsActionsTypes } from 'src/app/states/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

//  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor( private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    //this.productsEventEmitter.emit({type:ProductsActionsTypes.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent(
      {type:ProductsActionsTypes.GET_ALL_PRODUCTS}
       );
  }

  onGetSelectedProducts(){
    //this.productsEventEmitter.emit({type:ProductsActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent(
      {type:ProductsActionsTypes.GET_SELECTED_PRODUCTS}
      );
  }
  onGetAvailableProducts(){
   // this.productsEventEmitter.emit({type:ProductsActionsTypes.GET_AVAILABLE_PRODUCTS});
   this.eventDrivenService.publishEvent(
     {type:ProductsActionsTypes.GET_AVAILABLE_PRODUCTS}
     );
  }
  onNewProducts(){
    //this.productsEventEmitter.emit({type:ProductsActionsTypes.NEW_PRODUCT});
    this.eventDrivenService.publishEvent(
      {type:ProductsActionsTypes.NEW_PRODUCT}
      );
  }

  onSearch(dataForm:any){
   // this.productsEventEmitter.emit({type:ProductsActionsTypes.SEARCH_PRODUCTS, payload:dataForm});
    this.eventDrivenService.publishEvent(
      {type:ProductsActionsTypes.SEARCH_PRODUCTS, payload:dataForm}
      );
  }


}
