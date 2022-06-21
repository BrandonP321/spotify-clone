import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// export appropriately typed `useDispatch` and `useAppSelector` hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMusicPlayer = () => useAppSelector(state => state.musicPlayer);
export const useUserAuth = () => useAppSelector(state => state.auth);