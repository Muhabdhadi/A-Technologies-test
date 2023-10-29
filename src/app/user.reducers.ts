import {createReducer, on} from "@ngrx/store";
import {User} from "./user.interface";
import * as UserActions from './user.actions';
export const initialUserState: User[] = []
export const userReducers = createReducer(
    initialUserState,
    on(UserActions.deleteUser, (state, { userIndex} ) => {

        if (initialUserState.length) {
         return initialUserState.splice(userIndex);
        }

        return initialUserState;
    }),

    on(UserActions.addUser, (state, { name, email, mobile, date}) => {
        return [ ...initialUserState, {name: name, email: email, mobile: mobile, date: date} ]
    })
)
