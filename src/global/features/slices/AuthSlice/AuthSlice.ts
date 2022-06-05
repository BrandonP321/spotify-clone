import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
	accessToken: string | null;
}

const initialState: AuthState = {
	accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<{ token: string }>) => {
			state.accessToken = action.payload.token;
		}
    }
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;