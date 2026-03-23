import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'
import { NativeStackNavigationOptions } from 'node_modules/@react-navigation/native-stack/lib/typescript/src/types'

const PLAYLIST_SCREEN_OPTIONS: NativeStackNavigationOptions = {
	...StackScreenWithSearchBar,
	headerShown: true,
	headerTransparent: false,
	headerTitle: 'Playlists',
	headerSearchBarOptions: {
		placeholder: 'Find in playlist',
		tintColor: colors.primary,
		hideWhenScrolling: false,
	},
}

const PlaylistsScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={PLAYLIST_SCREEN_OPTIONS} />

			<Stack.Screen
				name="[name]"
				options={{
					headerTitle: '',
					headerBackVisible: true,
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTintColor: colors.primary,
				}}
			/>
		</Stack>
	)
}

export default PlaylistsScreenLayout
