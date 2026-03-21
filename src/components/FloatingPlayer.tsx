import { PlayerControls, PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { colors, fontSize } from '@/constants/tokens'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles, utilsStyles } from '@/styles'
import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { MovingText } from './MovingText'
import { PlayerProgressBar } from './PlayerProgressBar'
import { PlayerRepeatToggle } from './PlayerRepeatToggle'
import { PlayerVolumeBar } from './PlayerVolumeBar'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const [fullScreen, setFullScreen] = useState(false)
	const router = useRouter()
	const [isFavourite, setFavourite] = useState(false)
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()

	const lastActiveTrack = useLastActiveTrack()

	const displayTrack = activeTrack ?? lastActiveTrack

	const toggleFavourite = () => {
		// TODO: toggle favourite
		setFavourite(!isFavourite)
	}
	const handlePress = () => {
		// router.navigate('/player')
		setFullScreen(!fullScreen)
	}

	if (!displayTrack) return null

	return fullScreen ? (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, style]}>
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
		</TouchableOpacity>
	) : (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, style]}>
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
					<MovingText
						style={styles.trackTitle}
						animationThreshold={25}
						text={displayTrack.title ?? ''}
					/>
				</View>
				<View style={styles.trackCotrolsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const DismisaPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 8,
				left: 0,
				right: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View
				accessible={false}
				style={{
					width: 50,
					height: 8,
					borderRadius: 8,
					backgroundColor: '#fff',
					opacity: 0.7,
				}}
			/>
		</View>
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
