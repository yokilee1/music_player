import { PlaylistTracksList } from '@/components/PlaylistTracksList'
import { usePlaylist } from '@/store/library'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

const PlaylistScreen = () => {
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()

	const { playlists } = usePlaylist()

	const playlist = playlists.find((playlist) => playlist.name === playlistName)

	if (!playlist) {
		console.warn(`Playlist${playlistName} was no found`)

		return <Redirect href={`/(tabs)/playlists`} />
	}

	return (
		<View style={{ flex: 1 }}>
			<PlaylistTracksList playlist={playlist} />
		</View>
	)
}

export default PlaylistScreen
