import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Track } from 'react-native-track-player'
import { MovingText } from './MovingText'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls'

interface MiniScreenPlayerProps extends ViewProps {
	activeTrack: Track
	onPress: () => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const MiniScreenPlayer = ({ activeTrack, style, onPress }: MiniScreenPlayerProps) => {
	return (
		<AnimatedTouchableOpacity
			entering={FadeIn.duration(200)}
			// exiting={FadeOut.duration(100)}
			onPress={onPress}
			activeOpacity={0.9}
			style={[styles.container, style]}
		>
			<BlurView
				intensity={80}
				tint="light"
				blurMethod="dimezisBlurView"
				style={styles.blurBackground}
			/>
			<>
				<Image
					source={{
						uri: activeTrack.artwork ?? UNKNOWN_TRACK_IMAGE,
					}}
					style={[styles.trackArtworkImage, { opacity: 0.8 }]}
					contentFit="cover"
				/>

				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						animationThreshold={25}
						text={activeTrack.title ?? ''}
					/>
				</View>
				<View style={styles.trackCotrolsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</AnimatedTouchableOpacity>
	)
}

export default MiniScreenPlayer

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 30,
		borderRadius: 12,
		paddingVertical: 6,
		overflow: 'hidden',
	},
	fullContainer: {
		height: '200%',
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
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: 300,
		height: 300,
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})
