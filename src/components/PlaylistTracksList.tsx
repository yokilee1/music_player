import { colors, fontSize, screenPaddding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helper/filter'
import { generateTracksListId } from '@/helper/miscellaneous'
import { Playlist } from '@/helper/type'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'

export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in playlist',
		},
	})

	const filteredPlaylistTracks = useMemo(() => {
		return playlist.tracks.filter(trackTitleFilter(search))
	}, [playlist.tracks, search])

	return (
		<View
			style={{
				backgroundColor: colors.background,
				paddingHorizontal: screenPaddding.horizontal,
				paddingBottom: 100,
			}}
		>
			<TracksList
				id={generateTracksListId(playlist.name, search)}
				contentInsetAdjustmentBehavior="automatic"
				hideQueueControls={true}
				ListHeaderComponentStyle={styles.playlistHeaderContainer}
				ListHeaderComponent={
					<View>
						<View style={styles.artworkImageContainer}>
							<Image
								source={{
									uri: playlist.artworkPreview,
								}}
								style={styles.artworkImage}
							/>
						</View>

						<Text numberOfLines={1} style={styles.playlistNameText}>
							{playlist.name}
						</Text>

						{search.length === 0 && (
							<QueueControls style={{ paddingTop: 24 }} tracks={playlist.tracks} />
						)}
					</View>
				}
				tracks={filteredPlaylistTracks}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	playlistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},
	artworkImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playlistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
