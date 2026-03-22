import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

// export type Track = {
// 	title: string
// 	artist?: string
// 	artwork?: string
// 	[key: string]: any
// }

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
	id: string
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ id, tracks, ...flatlistProps }: TracksListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()
	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)
			await TrackPlayer.reset()
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)

			await TrackPlayer.play()

			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			TrackPlayer.play()
		}

		// await TrackPlayer.load(track)
		// await TrackPlayer.play()
	}

	return (
		<FlatList
			{...flatlistProps}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyComponentText}>No songs found</Text>
				</View>
			}
			data={tracks}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
		/>
	)
}
