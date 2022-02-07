export interface Excercise {
    _id:string;
    name:string;
    hasWeight:boolean;   
    bodyPart:BodyPart;
    primaryMuscles:string[];
    secondaryMuscles:string[];
}

export declare type BodyPart = 'upper' | 'middle' | 'lower';