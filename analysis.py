import pandas as pd


def analyzePlaylist(sp, playlistId):
    """
    Fetches audio features and returns a DataFrame.
    """
    tracks = sp.playlist_items(playlistId)["items"]
    trackIds = [item["track"]["id"] for item in tracks]

    features = sp.audio_features(trackIds)

    df = pd.DataFrame(features)[
        ["tempo", "energy", "danceability", "valence"]
    ]

    return df
