import { Type } from "@angular/core";
import { ModalContent } from "./modal-content.interface";

export interface OpenModalArgs<T> {
    component:Type<T>,
    title:string;
    inputs:{}
}
export interface CloseModalArgs {
    reason:'cancel' | string;
    data:any;
}
export interface ModalChangeEvent<T> {
    operation:'open' | 'close';
    args?:OpenModalArgs<T> | CloseModalArgs;
}
