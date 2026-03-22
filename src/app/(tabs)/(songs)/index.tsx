import library from '@/assets/data/library.json'
import { TracksList } from '@/components/TracksList'
import { colors, fontSize, screenPaddding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helper/filter'
import { defaultStyles } from '@/styles'
import { useMemo, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const SongsScreen = () => {
	// 在 SongsScreen.tsx 中
	const searchBarOptions = useMemo(
		() => ({
			placeholder: 'Find in songs',
		}),
		[],
	)

	const [search, setSearch] = useState('')

	const filteredSongs = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					value={search}
					onChangeText={setSearch}
					placeholder="Find in songs"
					placeholderTextColor={colors.textMuted}
					style={styles.searchInput}
					autoCapitalize="none"
					autoCorrect={false}
					returnKeyType="search"
					clearButtonMode="while-editing"
				/>
			</View>
			<TracksList
				tracks={filteredSongs}
				contentInsetAdjustmentBehavior="automatic"
				style={[defaultStyles.container, { paddingHorizontal: screenPaddding.horizontal }]}
			/>
		</View>
	)
}

export default SongsScreen

const styles = StyleSheet.create({
	searchContainer: {
		paddingHorizontal: screenPaddding.horizontal,
		paddingTop: 8,
		paddingBottom: 6,
	},
	searchInput: {
		height: 40,
		borderRadius: 12,
		paddingHorizontal: 12,
		backgroundColor: 'rgba(255,255,255,0.08)',
		color: colors.text,
		fontSize: fontSize.sm,
	},
})
