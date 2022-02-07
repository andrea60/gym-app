import { Observable, tap } from "rxjs";

export const debug = (name:string) => {
    return tap(value => console.log(`${name}: `, value))
}