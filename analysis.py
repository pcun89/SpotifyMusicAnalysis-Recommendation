import pandas as pd


def analyzePlaylist(sp, playlistId):
    try:
        results = sp.playlist_items(playlistId, limit=100)
        tracks = results["items"]

        trackIds = [
            item["track"]["id"]
            for item in tracks
            if item["track"] is not None
        ]

        features = sp.audio_features(trackIds)
        return pd.DataFrame(features)[
            ["tempo", "energy", "danceability", "valence"]
        ]

    except Exception:
        return None