import library from '@/assets/data/liarbry.json'
import { TracksList } from '@/components/TracksList'
import { screenPaddding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helper/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { View } from 'react-native'

const SongsScreen = () => {
	// 在 SongsScreen.tsx 中
	const searchBarOptions = useMemo(
		() => ({
			placeholder: 'Find in songs',
		}),
		[],
	)

	const search = useNavigationSearch({ searchBarOptions })

	const filteredSongs = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<TracksList
				tracks={filteredSongs}
				contentInsetAdjustmentBehavior="automatic"
				style={[defaultStyles.container, { paddingHorizontal: screenPaddding.horizontal }]}
			/>
		</View>
	)
}

export default SongsScreen
