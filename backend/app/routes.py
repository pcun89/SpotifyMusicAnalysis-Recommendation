from fastapi import APIRouter, HTTPException
from app.services.spotify_client import getSpotifyClient
from app.services.analysis import analyzePlaylist
from app.services.recommend import recommendSongs

router = APIRouter()

clientId = "f4668a783537463a91ce19997d7ab964"
clientSecret = "db8a8deb26a647098bbd022041221d0d"


def extractPlaylistId(url: str) -> str:
    return url.split("/")[-1].split("?")[0]


@router.get("/analyze")
def analyze(playlistUrl: str):
    try:
        if not clientId or not clientSecret:
            raise HTTPException(
                status_code=500, detail="Missing Spotify credentials")

        sp = getSpotifyClient(clientId, clientSecret)
        playlistId = extractPlaylistId(playlistUrl)

        df, metadata = analyzePlaylist(sp, playlistId)

        if df is None or df.empty:
            raise HTTPException(status_code=400, detail="No tracks found")

        stats = df.describe().to_dict()
        recommendations = recommendSongs(df, metadata)

        return {
            "stats": stats,
            "recommendations": recommendations
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
