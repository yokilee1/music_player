import library from '@/assets/data/library.json'
import { TrackWithPlaylist } from '@/helper/type'
import { useMemo } from 'react'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavourite: (trackId: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavourite: () => {},
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavourites = () => {
	// 仅订阅 tracks，然后由 useMemo 处理过滤
	const tracks = useLibraryStore((state) => state.tracks)
	const toggleTrackFavourite = useLibraryStore((state) => state.toggleTrackFavourite)

	const favourites = useMemo(() => {
		return tracks.filter((track) => track.rating === 1)
	}, [tracks])

	return {
		favourites,
		toggleTrackFavourite,
	}
}
