import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'

const SongScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					...StackScreenWithSearchBar,
					headerShown: true,
					headerTransparent: false,
					headerTitle: 'Songs',
					headerSearchBarOptions: {
						placeholder: 'Find in songs',
						tintColor: colors.primary,
						hideWhenScrolling: false,
					},
				}}
			/>
		</Stack>
	)
}

export default SongScreenLayout
