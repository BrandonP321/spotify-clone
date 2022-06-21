import { configureStore } from "@reduxjs/toolkit";
import pageLoadingReducer from "./slices/PageLoadingSlice/pageLoadingSlice";
import musicPlayerReducer from "./slices/MusicPlayerSlice/musicPlayerSlice";

export const store = configureStore({
	/* object of slice reducers to be combined */
	reducer: {
		pageLoading: pageLoadingReducer,
		musicPlayer: musicPlayerReducer
	}
})

// Infer the `RootState` and `AppDispatch` from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type of reducers object for dispatch
export type AppDispatch = typeof store.dispatch;