import { useFavourites } from '@/store/library'
import { useQueue } from '@/store/queue'
import { MenuView } from '@react-native-menu/menu'
import { useRouter } from 'expo-router'
import { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { match } from 'ts-pattern'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>

export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()
	const isFavourite = track.rating === 1

	const { toggleTrackFavourite } = useFavourites()
	const { activeQueueId } = useQueue()

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-to-favourite', async () => {
				toggleTrackFavourite(track)

				if (activeQueueId?.startsWith('favourites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favourite', async () => {
				toggleTrackFavourite(track)

				if (activeQueueId?.startsWith('favourite')) {
					const queue = await TrackPlayer.getQueue()
					const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)

					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', () => {
				router.push({ pathname: `/(modals)/AddToPlaylist`, params: { trackUrl: track.url } })
			})
			.otherwise(() => console.warn(`Unknown menu action ${id}`))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavourite ? 'remove-from-favourite' : 'add-to-favourite',
					title: isFavourite ? 'Remove from favourite' : 'Add to favourite',
					image: isFavourite ? 'star.fill' : 'star',
				},
				{
					id: 'add-to-playlist',
					title: 'Add to platlist',
					image: 'plus',
				},
			]}
		>
			{children}
		</MenuView>
	)
}
