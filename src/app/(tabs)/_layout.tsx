import { FloatingPlayer } from '@/components/FloatingPlayer'
import { colors, fontSize } from '@/constants/tokens'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import FontAwesome from '../../../node_modules/@expo/vector-icons/FontAwesome.d'
import FontAwesome6 from '../../../node_modules/@expo/vector-icons/FontAwesome6.d'
import Ionicons from '../../../node_modules/@expo/vector-icons/Ionicons.d'
import MaterialCommunityIcons from '../../../node_modules/@expo/vector-icons/MaterialCommunityIcons.d'

const TabsNavigationLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					headerShown: false,
					tabBarStyle: {
						position: 'absolute',
						borderTopWidth: 0,
						bottom: 24, // 距离底部高度
						marginHorizontal: 20,
						paddingTop: 5,
						height: 64, // 固定高度
						borderRadius: 32, // 大圆角
						backgroundColor: 'transparent', // 必须透明，否则看不到毛玻璃
						elevation: 0, // 去掉安卓阴影
						shadowColor: '#000', // iOS 投影，增加悬浮立体感
						shadowOffset: { width: 0, height: 10 },
						shadowOpacity: 0.1,
						shadowRadius: 10,
					},
					tabBarBackground: () => (
						<BlurView
							intensity={80} // 80-95 观感最佳
							tint="light" // 或 "dark"，根据你的主题调节
							style={{
								...StyleSheet.absoluteFillObject,
								borderRadius: 32, // 必须与 tabBarStyle 的圆角一致
								overflow: 'hidden',
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favourites"
					options={{
						title: 'Favourites',
						tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					options={{
						title: 'Playlists',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="playlist-play" size={28} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						title: 'Songs',
						tabBarIcon: ({ color }) => (
							<Ionicons name="musical-notes-sharp" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						title: 'Artists',
						tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={20} color={color} />,
					}}
				/>
			</Tabs>

			<FloatingPlayer
				style={{
					position: 'absolute',
					bottom: 100,
					borderRadius: 32, // 大圆角
					marginHorizontal: 20,
					elevation: 0, // 去掉安卓阴影
					backgroundColor: 'transparent', // 必须透明，否则看不到毛玻璃
					shadowColor: '#000', // iOS 投影，增加悬浮立体感
					shadowOffset: { width: 0, height: 10 },
					shadowOpacity: 0.1,
					shadowRadius: 10,
					paddingVertical: 30,
				}}
			/>
		</>
	)
}

export default TabsNavigationLayout
