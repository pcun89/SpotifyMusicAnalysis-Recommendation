import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


def getSpotifyClient():
    return spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            client_id="f4668a783537463a91ce19997d7ab964",
            client_secret="db8a8deb26a647098bbd022041221d0d"
        )
    )
