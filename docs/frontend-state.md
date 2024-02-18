# Frontend State Libraries

Frontend state libraries are essential for managing global and local state within applications, ensuring a consistent and predictable state throughout the application's lifecycle. This guide focuses on state management in Angular and React applications, utilizing NgRx for Angular and Redux with React.

## Angular State Management with NgRx

NgRx is a state management library inspired by Redux, tailored for Angular applications. It leverages RxJS, facilitating reactive programming and the management of state as streams of actions and reducers.

### Implementation Example

**Actions**:

Define user-related actions for loading users.

```typescript
// actions/user.actions.ts
import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const loadUsers = createAction("[User] Load Users");
export const loadUsersSuccess = createAction("[User] Load Users Success", props<{ users: User[] }>());
export const loadUsersFailure = createAction("[User] Load Users Failure", props<{ error: any }>());
```

**Reducers**:

Implement a reducer to handle state changes based on actions.

```typescript
// reducers/user.reducer.ts
import { createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions/user.actions";
import { User } from "../models/user.model";

export interface State {
  users: User[];
  error: any;
}

export const initialState: State = {
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
);
```

**Effects**:

Handle asynchronous operations such as API calls.

```typescript
// effects/user.effects.ts
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserService } from "../services/user.service";
import * as UserActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
```

## React State Management with Redux

Redux provides a predictable state container for JavaScript apps, and it can be used with React for managing application state.

### Implementation Example

**Actions**:

Define actions for managing users.

```javascript
// actions/userActions.js
export const loadUsers = () => ({
  type: "LOAD_USERS",
});

export const loadUsersSuccess = (users) => ({
  type: "LOAD_USERS_SUCCESS",
  payload: users,
});

export const loadUsersFailure = (error) => ({
  type: "LOAD_USERS_FAILURE",
  payload: error,
});
```

**Reducers**:

Create a reducer for handling user-related actions.

```javascript
// reducers/userReducer.js
const initialState = {
  users: [],
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USERS_SUCCESS":
      return { ...state, users: action.payload };
    case "LOAD_USERS_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
```

**Store**:

Configure the store to include the userReducer.

```javascript
// store.js
import { createStore, combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(rootReducer);
```

**Connecting React Components**:

Utilize `connect` from `react-redux` to access state and dispatch actions.

```javascript
// components/UserComponent.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUsers } from "../actions/userActions";

const UserComponent = ({ users, loadUsers }) => {
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Render users
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});

const mapDispatchToProps = {
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
```

## Conclusion

State management is a pivotal aspect of modern web application development, ensuring data consistency and predictable behavior across the application. By adopting state management libraries like NgRx for Angular and Redux for React, developers can streamline state operations, enhance maintainability, and improve the scalability of their applications.
