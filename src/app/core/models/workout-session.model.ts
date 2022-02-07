import { Set } from "./set.model";

export interface WorkoutSession {
    _id:string;
    begin:Date;
    end:Date | null;
    comment:string | null;

    excercises:Set[]
}