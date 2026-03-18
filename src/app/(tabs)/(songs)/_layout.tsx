import { StackScreenWithSearchBar } from '@/constants/layout'
import { Stack } from 'expo-router'

const SongScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: 'Songs' }} />
		</Stack>
	)
}

export default SongScreenLayout
