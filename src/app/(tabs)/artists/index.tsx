import { UNKNOWN_ARTIST_IMAGE } from '@/constants/image'
import { colors, fontSize, screenPaddding } from '@/constants/tokens'
import { artistNameFilter } from '@/helper/filter'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	const searchBarOptions = useMemo(
		() => ({
			placeholder: 'Find in artist',
		}),
		[],
	)

	const [search, setSearch] = useState('')
	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [artists, search])

	return (
		<View style={[defaultStyles.container, { paddingBottom: 200 }]}>
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
			<FlatList
				data={filteredArtists}
				ListEmptyComponent={
					<View>
						<Text>No artist found</Text>
					</View>
				}
				ListFooterComponent={ItemSeparatorComponent}
				ItemSeparatorComponent={ItemSeparatorComponent}
				contentInsetAdjustmentBehavior="automatic"
				style={[
					defaultStyles.container,
					{ paddingHorizontal: screenPaddding.horizontal, paddingBottom: 128 },
				]}
				renderItem={({ item: artist }) => {
					return (
						<Link href={`/artists/${artist.name}`} asChild>
							<TouchableHighlight>
								<View style={styles.artistItmeContainer}>
									<View>
										<Image
											source={{
												uri: UNKNOWN_ARTIST_IMAGE,
											}}
											style={styles.artistImage}
										></Image>
									</View>
									<View style={{ width: '100%' }}>
										<Text numberOfLines={1} style={styles.artistNameText}>
											{artist.name}
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</Link>
					)
				}}
			/>
		</View>
	)
}

export default ArtistsScreen

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
	artistItmeContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignContent: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		top: 10,
		fontSize: 17,
		maxWidth: '80%',
	},
})
