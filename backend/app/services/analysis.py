import pandas as pd


def analyzePlaylist(sp, playlistId):
    playlist = sp.playlist(playlistId)   # ✅ safer endpoint
    tracks = playlist["tracks"]["items"]

    features = []
    metadata = []

    for item in tracks:
        track = item.get("track")

        if not track or not track.get("id"):
            continue

        audio = sp.audio_features([track["id"]])[0]

        if audio:
            features.append(audio)

            metadata.append({
                "name": track["name"],
                "artist": track["artists"][0]["name"],
                "image": track["album"]["images"][0]["url"]
                if track["album"]["images"] else None
            })

    if not features:
        return None, None

    df = pd.DataFrame(features)
    return df, metadata
