import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { useState } from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import FullScreenPlayer from './FullScreenPlayer'
import MiniScreenPlayer from './MiniScreenPlayer'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const [fullScreen, setFullScreen] = useState(false)

	const activeTrack = useActiveTrack()

	const lastActiveTrack = useLastActiveTrack()

	const displayTrack = activeTrack ?? lastActiveTrack

	const handlePress = () => {
		// router.navigate('/player')
		setFullScreen(!fullScreen)
	}

	if (!displayTrack) return null

	return fullScreen ? (
		<FullScreenPlayer
			onPress={handlePress}
			style={[styles.container, style]}
			activeTrack={displayTrack}
		/>
	) : (
		<MiniScreenPlayer
			onPress={handlePress}
			style={[styles.container, style]}
			activeTrack={displayTrack}
		/>
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
	animatedContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		alignSelf: 'center',
		overflow: 'hidden',
		backgroundColor: 'transparent', // 背景由内部的 BlurView 提供
	},
	miniWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
	},
	fullWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	surface: {
		width: '100%',
	},
})
