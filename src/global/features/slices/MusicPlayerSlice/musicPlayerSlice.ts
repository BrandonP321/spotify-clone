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

/**
 * Music player slice for interacting with the song being played and songs in queue
 */
const musicPlayerSlice = createSlice({
	name: "musicPlayer",
	initialState,
	reducers: {
		/**
		 * Plays a new song and adds list of songs to queue
		 */
		playSong: (state, action: PayloadAction<{ indexInQueue: number; queue: SongItem[] }>) => {
			const { indexInQueue, queue } = action.payload;

			const song = queue[indexInQueue];

			// if new song is from new queue, update queue
			if (song.context?.type !== state.currentSong?.context?.type || getSongContextId(song) !== getSongContextId(state.currentSong)) {
				state.queue = queue;
			}

			state.isPaused = false;
			state.currentSong = song;
			state.currentSongIndex = indexInQueue;
			
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

/**
 * Returns ID of the context (eg. Artist, Album, etc.) for a song
 */
const getSongContextId = (song: SongItem) => {
	switch (song.context.type) {
		case "album":
			return song.context.albumId;
		case "artist":
			return song.context.artistId;
		case "playlist":
			return song.context.playlistId;
	}
}

export const { playSong, pauseSong, playNextSong, playPrevSong, resumeSong } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;

/* Generate song queue item from Track response */
export const getQueueItemFromSong: (songs: SpotifyTrack, context: SongItem["context"]) => SongItem = (song, context) => ({
	albumImg: song?.album?.images?.[0]?.url,
	artist: song?.artists?.map(a => a.name)?.join(", "),
	id: song?.id,
	title: song?.name,
	previewUrl: song?.preview_url,
	context
})

/* helper function to generate song queue from list of Tracks */
export const getQueueFromSongList: (songs: SpotifyTrack[], context: SongItem["context"]) => Promise<SongItem[]> = (songs, context) => {
	return new Promise((resolve, reject) => {
		return resolve(songs?.map(s => getQueueItemFromSong(s, context)));
	})
}