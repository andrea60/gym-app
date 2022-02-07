import { tap } from "rxjs"

export function tapIf<T>(expectedVal:T, callback:(v:T) => any) {
    return tap((val:T) => {
        if (val === expectedVal)
            callback(val);
    });
}