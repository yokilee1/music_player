import { colors, fontSize } from '@/constants/tokens'
import { formatSecondsToMinute } from '@/helper/miscellaneous'
import { defaultStyles, utilsStyles } from '@/styles'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'
export const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)

	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const trackElapsedTime = formatSecondsToMinute(position)
	const trackRemainingTime = formatSecondsToMinute(duration - position)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	return (
		<View style={style}>
			<Slider
				progress={progress}
				minimumValue={min}
				maximumValue={max}
				containerStyle={utilsStyles.slider}
				thumbWidth={0}
				renderBubble={() => null}
				onSlidingStart={() => (isSliding.value = true)}
				onValueChange={() => async (value: number) => {
					await TrackPlayer.seekTo(value * duration)
				}}
				onSlidingComplete={() => async (value) => {
					if (!isSliding.value) return
					isSliding.value = false
					await TrackPlayer.seekTo(value * duration)
				}}
				theme={{
					maximumTrackTintColor: colors.maximumTrackTintColor,
					minimumTrackTintColor: colors.minimumTrackTintColor,
				}}
			/>
			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElapsedTime}</Text>
				<Text style={styles.timeText}>
					{'-'}
					{trackRemainingTime}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	timeText: {
		...defaultStyles.text,
		color: colors.text,
		opacity: 0.75,
		fontSize: fontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		alignItems: 'baseline',
	},
})
