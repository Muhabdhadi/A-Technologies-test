import { createFeatureSelector } from "@ngrx/store";
import { User } from "../interfaces/user.interface";

export const selectUser = createFeatureSelector<User[]>('user');
