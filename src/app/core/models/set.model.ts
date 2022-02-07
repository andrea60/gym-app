import { Repetition } from "./repetition.model";

export interface Set {
    id:string;
    excerciseId: string;
    reps:Repetition[];
}