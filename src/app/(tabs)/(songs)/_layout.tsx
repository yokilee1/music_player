import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'

const SONGS_SCREEN_OPTIONS: NativeStackNavigationOptions = {
	...StackScreenWithSearchBar,
	headerShown: true,
	headerTransparent: false,
	headerTitle: 'Songs',
	headerSearchBarOptions: {
		placeholder: 'Find in songs',
		tintColor: colors.primary,
		hideWhenScrolling: false,
	},
}

const SongScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={SONGS_SCREEN_OPTIONS} />
		</Stack>
	)
}

export default SongScreenLayout
