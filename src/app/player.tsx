import { MovingText } from '@/components/MovingText'
import { UNKNOWN_TRACK_IMAGE } from '@/constants/image'
import { colors, screenPaddding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayScreen = () => {
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<View style={styles.overlayContainer}>
			<DismisaPlayerSymbol />
			<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
				<View style={styles.artworkImageContainer}>
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
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
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
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPaddding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.7)',
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
		width: '90%',
		height: '90%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
})
export default PlayScreen
