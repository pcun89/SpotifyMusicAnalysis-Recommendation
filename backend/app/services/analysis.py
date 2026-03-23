import pandas as pd


def analyzePlaylist(sp, playlistId):
    # Safe search query
    results = sp.search(q="top hits", type="track", limit=10)

    tracks = results["tracks"]["items"]

    data = []
    metadata = []

    for track in tracks:
        data.append({
            "popularity": track.get("popularity", 0),
            "duration_ms": track.get("duration_ms", 0),
            "explicit": int(track.get("explicit", False))
        })

        album = track.get("album", {})
        images = album.get("images", [])
        image_url = images[0]["url"] if images else None

        metadata.append({
            "name": track.get("name"),
            "artist": track.get("artists")[0]["name"] if track.get("artists") else "Unknown",
            "image": image_url
        })

    if not data:
        return None, None

    df = pd.DataFrame(data)

    return df, metadata
