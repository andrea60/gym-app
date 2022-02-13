import { Type } from "@angular/core";
import { ModalContent } from "./modal-content.interface";

export interface ModalConfig {
    closeOnBackdrop:boolean;
    position:'bottom' | 'center';
}

export interface OpenModalArgs<T> extends ModalConfig {
    component:Type<T>,
    inputs:{},
    title:string;
}
export interface CloseModalArgs {
    reason:'cancel' | string;
    data:any;
}
export interface ModalChangeEvent<T> {
    operation:'open' | 'close';
    args?:OpenModalArgs<T> | CloseModalArgs;
}
