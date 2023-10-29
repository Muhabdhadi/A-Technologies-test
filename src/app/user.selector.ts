import { createFeatureSelector } from "@ngrx/store";
import {User} from "./user.interface";

export const selectUser = createFeatureSelector<User[]>('user');
