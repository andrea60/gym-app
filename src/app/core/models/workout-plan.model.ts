import { Workout } from "./workout.model";

export interface WorkoutPlan {
    _id:string;
    name:string;

    workouts:Workout[];
}