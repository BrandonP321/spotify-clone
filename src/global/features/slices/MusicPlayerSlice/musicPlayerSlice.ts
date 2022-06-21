import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpotifyTrack } from "../../../../utils";

type SongItem = {
	id: string;
	albumImg: string;
	title: string;
	artist: string;
}

export interface MusicPlayerState {
	currentSongIndex: number | null;
	queue: (SongItem[]) | null;
	currentSong: SongItem | null;
	isPaused: boolean;
}

const initialState: MusicPlayerState = {
	currentSongIndex: null,
	currentSong: null,
	queue: null,
	isPaused: true,
}

const musicPlayerSlice = createSlice({
	name: "musicPlayer",
	initialState,
	reducers: {
		playSong: (state, action: PayloadAction<{ song: SongItem; indexInQueue: number; queue: MusicPlayerState["queue"] }>) => {
			const { indexInQueue, song, queue } = action.payload;

			state.currentSong = song;
			state.currentSongIndex = indexInQueue;
			state.isPaused = false;
			state.queue = queue
		},
		resumeSong: (state) => {
			state.isPaused = false;
		},
		pauseSong: (state) => {
			state.isPaused = true;
		},
		playNextSong: (state) => {

		},
		playPrevSong: (state) => {

		}
	}
});

export const { playSong, pauseSong, playNextSong, playPrevSong, resumeSong } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;

/* helper function to generate song queue item from song response */
export const getQueueItemFromSong: (songs: SpotifyTrack) => SongItem = (song) => ({
	albumImg: song?.album?.images?.[0]?.url,
	artist: song?.artists?.map(a => a.name)?.join(", "),
	id: song?.id,
	title: song?.name
})

/* helper function to generate song queue from list of songs */
export const getQueueFromSongList: (songs: SpotifyTrack[]) => SongItem[] = (songs) => {
	return songs?.map(s => getQueueItemFromSong(s));
}