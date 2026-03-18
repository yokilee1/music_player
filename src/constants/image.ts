import unknowArtistImage from '@/assets/images/unknown_artist.png'
import unknowTrackImage from '@/assets/images/unknown_track.png'
import { Image } from 'react-native'

export const UNKNOWN_ARTIST_IMAGE = Image.resolveAssetSource(unknowArtistImage).uri
export const UNKNOWN_TRACK_IMAGE = Image.resolveAssetSource(unknowTrackImage).uri
