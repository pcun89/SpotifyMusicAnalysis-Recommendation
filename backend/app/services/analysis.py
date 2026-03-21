import pandas as pd


def analyzePlaylist(sp, playlistId):
    tracks = sp.playlist_items(playlistId)["items"]
    features = []

    for item in tracks:
        track = item.get("track")
        if not track or not track.get("id"):
            continue

        audio = sp.audio_features([track["id"]])[0]
        if audio:
            features.append(audio)

    if not features:
        return None

    df = pd.DataFrame(features)
    return df