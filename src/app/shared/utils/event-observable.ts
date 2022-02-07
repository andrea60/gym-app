import { Observable, ReplaySubject, Subject } from "rxjs";


export class EventObservable<T> extends Observable<T> {
    private subj:Subject<T>;
    private proxy$: Observable<T>;
    constructor(replay:boolean=false) {
        super(sub => {
            const s = this.proxy$.subscribe({
                next: v => sub.next(v),
                error: err => sub.error(err),
                complete:() => sub.complete()
            });

            return () => s.unsubscribe();
        });

        this.subj = replay ? new ReplaySubject<T>() : new Subject<T>();
        this.proxy$ = this.subj.asObservable();
    }

    emit(value:T){
        this.subj.next(value);
    }
    complete(){
        this.subj.complete();
    }
}