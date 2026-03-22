import { colors } from '@/constants/tokens'
import { useEffect, useState } from 'react'
import type { IOSImageColors } from 'react-native-image-colors'
import { getColors } from 'react-native-image-colors'

export const usePlayerBackground = (imageUrl: string) => {
	const [backgroundImage, setBackgroundImage] = useState<IOSImageColors | null>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => setBackgroundImage(colors as IOSImageColors))
	}, [imageUrl])

	return { backgroundImage }
}
