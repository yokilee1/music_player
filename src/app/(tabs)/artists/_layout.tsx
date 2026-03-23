import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack } from 'expo-router'

const ARTIST_SCREEN_OPTIONS: NativeStackNavigationOptions = {
	...StackScreenWithSearchBar,
	headerShown: true,
	headerTransparent: false,
	headerTitle: 'Artists',
	headerSearchBarOptions: {
		placeholder: 'Find in artist',
		tintColor: colors.primary,
		hideWhenScrolling: false,
	},
}

const ArtistsScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={ARTIST_SCREEN_OPTIONS} />
			<Stack.Screen
				name="[name]"
				options={{
					headerShown: true,
					headerTransparent: false,
					headerBackVisible: true,
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTintColor: colors.primary,
					headerTitle: '',
					headerSearchBarOptions: {
						placeholder: 'Find in artist',
						tintColor: colors.primary,
						hideWhenScrolling: false,
					},
				}}
			/>
		</Stack>
	)
}

export default ArtistsScreenLayout
