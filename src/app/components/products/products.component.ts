import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of,} from 'rxjs';
import { map, startWith, catchError, subscribeOn} from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductsActionsTypes } from 'src/app/states/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(
    private productService:ProductsService,
     private router:Router,
     private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }
products$:Observable<AppDataState<Product[]>>|null=null;
readonly DataStateEnum=DataStateEnum;
  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm:any){
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError((err)=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onSelect(p:Product){
    this.productService.select(p).subscribe(
      data => {
       // this.onGetAllProducts();
       p.selected = data.selected;
      }
    );
  }
  onDelete(product:Product){
    let v = confirm("Voulez vous vraimant supprimer?");
    if(v==true)
    this.productService.delete(product).subscribe(
      data => {
        this.onGetAllProducts();
       }
    );
  }
  onNeweProducts(){
    this.router.navigateByUrl("/newProduct");
  }
  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event:ActionEvent){
   switch ($event.type) {
     case ProductsActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
     case ProductsActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
     case ProductsActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
     case ProductsActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
     case ProductsActionsTypes.NEW_PRODUCT:this.onNeweProducts();break;
     case ProductsActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
     case ProductsActionsTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
     case ProductsActionsTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
     default:
       break;
   }
  }
}

