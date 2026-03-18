import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const ArtistsScreenLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ ...StackScreenWithSearchBar, headerTitle: 'Artists' }}
			/>
		</Stack>
	)
}

export default ArtistsScreenLayout
