import {createAction, props} from "@ngrx/store";

export const addUser = createAction('[Home Page] Create User', props<{
    name: string,
    email: string,
    mobile: string,
    date: Date
}>())

export const deleteUser = createAction('[Home Page] Delete User', props<{
    userIndex: number
}>());
