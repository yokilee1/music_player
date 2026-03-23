import { PlaylistListItem } from '@/components/PlaylistListItem'
import { playlistNameFilter } from '@/helper/filter'
import { Playlist } from '@/helper/type'
import { utilsStyles } from '@/styles'
import { useMemo, useState } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'

type PlaylistProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 12, marginLeft: 80 }} />
)
export const PlaylistList = ({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatListProps
}: PlaylistProps) => {
	const [search, setSearch] = useState('')

	const filteredPlaylist = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyComponentText}> No playlist found</Text>
				</View>
			}
			data={filteredPlaylist}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
			)}
			{...flatListProps}
		/>
	)
}
