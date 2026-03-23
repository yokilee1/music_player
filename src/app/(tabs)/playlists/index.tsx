import { PlaylistList } from '@/components/PlaylistList'
import { colors, fontSize, screenPaddding } from '@/constants/tokens'
import { playlistNameFilter } from '@/helper/filter'
import { Playlist } from '@/helper/type'
import { usePlaylist } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const PlaylistsScreen = () => {
	const router = useRouter()

	const [search, setSearch] = useState('')

	const { playlists } = usePlaylist()

	const filterPlaylist = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}

	return (
		<View style={defaultStyles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					value={search}
					onChangeText={setSearch}
					placeholder="Find in songs"
					placeholderTextColor={colors.textMuted}
					style={styles.searchInput}
					autoCapitalize="none"
					autoCorrect={false}
					returnKeyType="search"
					clearButtonMode="while-editing"
				/>
			</View>
			<PlaylistList
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPaddding.horizontal }}
				playlists={filterPlaylist}
				onPlaylistPress={handlePlaylistPress}
			/>
		</View>
	)
}

export default PlaylistsScreen

const styles = StyleSheet.create({
	searchContainer: {
		paddingHorizontal: screenPaddding.horizontal,
		paddingTop: 8,
		paddingBottom: 6,
	},
	searchInput: {
		height: 40,
		borderRadius: 12,
		paddingHorizontal: 12,
		backgroundColor: 'rgba(255,255,255,0.08)',
		color: colors.text,
		fontSize: fontSize.sm,
	},
})
