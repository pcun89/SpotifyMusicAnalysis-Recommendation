from fastapi import APIRouter, HTTPException
from app.services.spotify_client import getSpotifyClient
from app.services.analysis import analyzePlaylist
from app.services.recommend import recommendSongs

router = APIRouter()


def extractPlaylistId(url: str) -> str:
    return url.split("/")[-1].split("?")[0]


@router.get("/analyze")
def analyze(playlistUrl: str):
    try:
        sp = getSpotifyClient()
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
