import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


def getSpotifyClient(clientId, clientSecret):
    authManager = SpotifyClientCredentials(
        client_id=clientId,
        client_secret=clientSecret
    )

    sp = spotipy.Spotify(auth_manager=authManager)
    return sp
