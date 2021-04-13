import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ActionEvent, AppDataState, ProductsActionsTypes } from 'src/app/states/product.state';
import { DataStateEnum } from "../../../states/product.state"

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$:Observable<AppDataState<Product[]>>|null=null;

  @Output() productsEventeEmitter:EventEmitter<ActionEvent> = new EventEmitter();

  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product:Product){
    this.productsEventeEmitter.emit({
      type:ProductsActionsTypes.SELECT_PRODUCT, payload:product
    });
  }

  onDelete(product:Product){
    this.productsEventeEmitter.emit({
      type: ProductsActionsTypes.DELETE_PRODUCT, payload: product
    });
  }
  onEdit(product:Product){
    this.productsEventeEmitter.emit({
      type: ProductsActionsTypes.EDIT_PRODUCT, payload: product
    });
  }

  onActionEvent($event:ActionEvent){
    this.productsEventeEmitter.emit($event);
  }

}
