import {createReducer, on} from "@ngrx/store";
import * as UserActions from './user.actions';
import {User} from "../interfaces/user.interface";
export const initialUserState: User[] = []
export const userReducers = createReducer(
    initialUserState,
    on(UserActions.deleteUser, (state, { userIndex} ) => {
        const newState = [...state];

        newState.splice(userIndex, 1);

        return [...newState];
    }),

    on(UserActions.addUser, (state, { name, email, mobile, date}) => {

        return [ ...state, { name: name, email: email, mobile: mobile, date: date } ]
    })
)
