import { configureStore } from "@reduxjs/toolkit";
import bikesList from "../../features/bikes-list/slices/bikes-list.slice";

export const store = configureStore({
  reducer: { bikesList },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
