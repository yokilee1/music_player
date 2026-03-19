import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const activeTrck = useActiveTrack()

	const lastActiveTrack = useLastActiveTrack()

	const displayTrack = activeTrck ?? lastActiveTrack

	if (!displayTrack) return null

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
			<BlurView
				intensity={80}
				tint="light"
				blurMethod="dimezisBlurView"
				style={styles.blurBackground}
			/>
			<>
				<Image
					source={{
						uri: displayTrack.artwork ?? UNKNOWN_TRACK_IMAGE,
					}}
					style={[styles.trackArtworkImage, { opacity: 0.8 }]}
					contentFit="cover"
				/>

				<View style={styles.trackTitleContainer}>
					<Text style={styles.trackTitle}>{displayTrack.title}</Text>
				</View>
				<View style={styles.trackCotrolsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 30,
		borderRadius: 12,
		paddingVertical: 6,
		overflow: 'hidden',
	},
	blurBackground: {
		...StyleSheet.absoluteFillObject,
	},
	trackArtworkImage: {
		width: 50,
		height: 50,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackCotrolsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
