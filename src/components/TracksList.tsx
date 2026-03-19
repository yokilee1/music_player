import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

// export type Track = {
// 	title: string
// 	artist?: string
// 	artwork?: string
// 	[key: string]: any
// }

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = async (track: Track) => {
		// console.log('Selected track:', track)
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			{...flatlistProps}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			data={tracks}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
		/>
	)
}
