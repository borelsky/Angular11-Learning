import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductsActionsTypes } from 'src/app/states/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?:Product;
 // @Output()  eventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }
  onSelect(product: Product){
   /* this.eventEmitter.emit({
      type: ProductsActionsTypes.SELECT_PRODUCT, payload: product
    });*/
    this.eventDrivenService.publishEvent({type:ProductsActionsTypes.SELECT_PRODUCT, payload:product});
  }
  onEdit(product: Product){
  /*  this.eventEmitter.emit({
      type: ProductsActionsTypes.EDIT_PRODUCT, payload: product
    });*/
    this.eventDrivenService.publishEvent({type:ProductsActionsTypes.EDIT_PRODUCT, payload:product});
  }
  onDelete(product: Product){
    /*this.eventEmitter.emit({
      type: ProductsActionsTypes.DELETE_PRODUCT, payload: product
    });*/
    this.eventDrivenService.publishEvent({type:ProductsActionsTypes.DELETE_PRODUCT, payload:product});
  }
}
