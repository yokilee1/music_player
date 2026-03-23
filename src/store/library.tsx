import library from '@/assets/data/library.json'
import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { Artist, Playlist, TrackWithPlaylist } from '@/helper/type'
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

// ✅ 修改后的 store/library.ts
export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	return useMemo(() => {
		return tracks.reduce((acc, track) => {
			const artistName = track.artist ?? 'Unknown'
			const existingArtist = acc.find((artist) => artist.name === artistName)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: artistName,
					tracks: [track],
				})
			}
			return acc
		}, [] as Artist[])
	}, [tracks]) // 只有当 tracks 真正改变时才重新计算
}

export const usePlaylist = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	const playlists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName: string) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? UNKNOWN_TRACK_IMAGE,
					})
				}
			})
			return acc
		}, [] as Playlist[])
	}, [tracks])

	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return { playlists, addToPlaylist }
}
