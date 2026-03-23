import { UNKNOWN_ARTIST_IMAGE } from '@/constants/image'
import { colors, fontSize, screenPaddding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helper/filter'
import { generateTracksListId } from '@/helper/miscellaneous'
import { Artist } from '@/helper/type'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in songs',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [artist.tracks, search])

	return (
		<View
			style={{
				backgroundColor: colors.background,
				paddingHorizontal: screenPaddding.horizontal,
				paddingBottom: 200,
			}}
		>
			<TracksList
				id={generateTracksListId(artist.name, search)}
				hideQueueControls={true}
				ListHeaderComponentStyle={styles.artistHeaderContainer}
				ListHeaderComponent={
					<View>
						<View style={styles.artworkImageContainer}>
							<Image
								source={{
									uri: UNKNOWN_ARTIST_IMAGE,
								}}
								style={styles.artistImage}
							/>
						</View>

						<Text numberOfLines={1} style={styles.artistNameText}>
							{artist.name}
						</Text>

						{search.length === 0 && (
							<QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
						)}
					</View>
				}
				tracks={filteredArtistTracks}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
		marginTop: 20,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
