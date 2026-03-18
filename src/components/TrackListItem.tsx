import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'


export type TrackListItemProps = {
	track: {
		title: string
		image?: string
		artist?: string
	}
}

export const TrackListItem = ({ track }: TrackListItemProps) => {
	const isActiveTrack = false

	return (
		<TouchableHighlight>
			<View style={styles.trackItemContainer}>
				<View>
					<Image
						source={{
							uri: track.image ?? UNKNOWN_TRACK_IMAGE,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
						contentFit='cover'
					/>
				</View>

				{/* Track Title + artist */}
				<View style={{ width: '100%' }}>
					<Text
						numberOfLines={1}
						style={{
							...styles.trackArtworkText,
							color: isActiveTrack ? colors.primary : colors.text,
						}}
					>
						{track.title}
					</Text>

					{track.artist && (
						<Text
							numberOfLines={1}
							style={{
								...styles.trackArtistText,
							}}
						>
							{track.artist}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackArtworkText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
})
