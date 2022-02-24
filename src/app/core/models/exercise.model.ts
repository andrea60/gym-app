import { BodyArea } from "./body-area.model";

export interface Exercise {
    _id:string;
    name:string;
    hasWeight:boolean;   
    bodyArea:BodyArea;
    primaryMuscles:string[];
    secondaryMuscles:string[];
    equipmentIds:string[]
}

