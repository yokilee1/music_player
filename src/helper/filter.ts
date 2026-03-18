import { Track } from '@/components/TracksList'

export const trackTitleFilter = (title: string) => (track: Track) =>
	track.title.toLowerCase().includes(title.toLowerCase())
