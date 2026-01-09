import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


def getSpotifyClient(clientId, clientSecret):
    """
    Creates and returns a Spotify API client.
    """
    authManager = SpotifyClientCredentials(
        client_id=clientId,
        client_secret=clientSecret
    )
    return spotipy.Spotify(auth_manager=authManager)