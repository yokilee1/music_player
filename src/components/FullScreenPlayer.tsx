import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { colors, fontSize } from '@/constants/tokens'
import { useTrackPlayerFavourite } from '@/hooks/useTrackPlayerFavourite'
import { defaultStyles, utilsStyles } from '@/styles'
import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Track } from 'react-native-track-player'
import { MovingText } from './MovingText'
import { PlayerControls } from './PlayerControls'
import { PlayerProgressBar } from './PlayerProgressBar'
import { PlayerRepeatToggle } from './PlayerRepeatToggle'
import { PlayerVolumeBar } from './PlayerVolumeBar'

interface FullScreenPlayerProps extends ViewProps {
	activeTrack: Track
	onPress: () => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export const FullScreenPlayer = ({ style, activeTrack, onPress }: FullScreenPlayerProps) => {
	const { isFavourite, toggleFavourite } = useTrackPlayerFavourite()

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
			{/* <DismisaPlayerSymbol /> */}
			<View style={{ flex: 1 }}>
				<View style={[styles.artworkImageContainer, { marginBottom: 30 }]}>
					<Image
						source={{
							uri: activeTrack.artwork ?? UNKNOWN_TRACK_IMAGE,
						}}
						resizeMode="cover"
						style={styles.artworkImage}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<View style={{ marginTop: 'auto' }}>
						<View style={{ height: 60 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<View style={styles.trackTitleContainer}>
									<MovingText
										text={activeTrack.title ?? ''}
										animationThreshold={30}
										style={styles.trackTitleText}
									/>
								</View>

								<FontAwesome
									name={isFavourite ? 'heart' : 'heart-o'}
									size={20}
									color={isFavourite ? colors.primary : colors.icon}
									style={{ marginHorizontal: 14 }}
									onPress={toggleFavourite}
								/>
							</View>

							{activeTrack?.artist && (
								<Text style={[styles.trackArtistText, { marginTop: 6 }]}>{activeTrack.artist}</Text>
							)}
						</View>
						<PlayerProgressBar style={{ marginTop: 32 }} />
						<PlayerControls style={{ marginTop: 40 }} />
					</View>

					<PlayerVolumeBar style={{ marginTop: 40, marginBottom: 30 }} />

					<View style={utilsStyles.centeredRow}>
						<PlayerRepeatToggle size={30} style={{ marginTop: 6 }} />
					</View>
				</View>
			</View>
		</AnimatedTouchableOpacity>
	)
}
export default FullScreenPlayer

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
