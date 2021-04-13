
export enum ProductsActionsTypes {
  GET_ALL_PRODUCTS = "[Products] Get All Products",
  GET_SELECTED_PRODUCTS = "[Products] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Products] Get Available Products",
  SEARCH_PRODUCTS = "[Products] Search Products",
  NEW_PRODUCT = "[Products] New Product",
  SELECT_PRODUCT = "[Products] Select Product",
  EDIT_PRODUCT = "[Products] Edit Product",
  DELETE_PRODUCT = "[Products] DeleteProduct"
}


export interface ActionEvent {
  type: ProductsActionsTypes,
  payload?: any
}


export enum DataStateEnum {
LOADING,
LOADED,
ERROR
}


export interface AppDataState<T> {
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}
