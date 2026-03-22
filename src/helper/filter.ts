import { Track } from '@/components/TracksList'
import { Artist } from './type'

export const trackTitleFilter = (title: string) => (track: Track) =>
	track.title.toLowerCase().includes(title.toLowerCase())

export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())
