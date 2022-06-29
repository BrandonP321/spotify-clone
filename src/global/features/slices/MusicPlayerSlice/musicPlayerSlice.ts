import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpotifyTrack } from "../../../../utils";

export type SongContext = {
	type: "artist";
	artistId: string;
	artistName: string;
} | {
	type: "album";
	albumId: string;
	albumName: string;
} | {
	type: "playlist";
	playlistId: string;
	playlistName: string;
} | {
	type: "none"
}

export type SongItem = {
	id: string;
	albumImg: string;
	title: string;
	artist: string;
	previewUrl: string | null;
	context: SongContext;
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
		playSong: (state, action: PayloadAction<{ indexInQueue: number; queue: SongItem[] }>) => {
			const { indexInQueue, queue } = action.payload;

			const song = queue[indexInQueue];

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
			const nextSongIndex = (state.currentSongIndex === null) || state.currentSongIndex >= (state.queue?.length ?? 0) - 1 ? 0 : state.currentSongIndex + 1;
			const nextSong = state.queue?.[nextSongIndex];

			state.currentSongIndex = nextSongIndex;
			state.currentSong = nextSong ?? null;
		},
		playPrevSong: (state) => {
			const prevSongIndex = (state.currentSongIndex === null) || (state.currentSongIndex ?? 0) <= 0 ? 0 : state.currentSongIndex - 1;
			const prevSong = state.queue?.[prevSongIndex];

			state.currentSongIndex = prevSongIndex;
			state.currentSong = prevSong ?? null;
		}
	}
});

export const { playSong, pauseSong, playNextSong, playPrevSong, resumeSong } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;

/* helper function to generate song queue item from song response */
export const getQueueItemFromSong: (songs: SpotifyTrack, context: SongItem["context"]) => SongItem = (song, context) => ({
	albumImg: song?.album?.images?.[0]?.url,
	artist: song?.artists?.map(a => a.name)?.join(", "),
	id: song?.id,
	title: song?.name,
	previewUrl: song?.preview_url,
	context
})

/* helper function to generate song queue from list of songs */
export const getQueueFromSongList: (songs: SpotifyTrack[], context: SongItem["context"]) => SongItem[] = (songs, context) => {
	return songs?.map(s => getQueueItemFromSong(s, context));
}