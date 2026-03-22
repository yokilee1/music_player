import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'

const FAVOURITES_SCREEN_OPTIONS: NativeStackNavigationOptions = {
	...StackScreenWithSearchBar,
	headerShown: true,
	headerTransparent: false,
	headerTitle: 'Favourites',
	headerSearchBarOptions: {
		placeholder: 'Find in songs',
		tintColor: colors.primary,
		hideWhenScrolling: false,
	},
}

const FavouritesScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={FAVOURITES_SCREEN_OPTIONS} />
		</Stack>
	)
}

export default FavouritesScreenLayout
