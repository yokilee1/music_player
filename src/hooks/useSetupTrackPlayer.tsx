import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.setVolume(0.03) //not too loud
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)
	useEffect(() => {
		if (!isInitialized.current) {
			setupPlayer()
				.then(() => {
					isInitialized.current = true
					onLoad?.()
				})
				.catch((e) => {
					isInitialized.current = false
					console.error(e)
				})
		}
	}, [onLoad])
}
