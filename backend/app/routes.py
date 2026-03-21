from fastapi import APIRouter, HTTPException
from app.services.spotify_client import getSpotifyClient
from app.services.analysis import analyzePlaylist
from app.services.recommend import recommendSongs
import os

router = APIRouter()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")


def extractPlaylistId(url: str) -> str:
    return url.split("/")[-1].split("?")[0]


@router.get("/analyze")
def analyze(playlistUrl: str):
    try:
        if not CLIENT_ID or not CLIENT_SECRET:
            raise HTTPException(status_code=500, detail="Missing Spotify credentials")

        sp = getSpotifyClient(CLIENT_ID, CLIENT_SECRET)
        playlistId = extractPlaylistId(playlistUrl)

        df = analyzePlaylist(sp, playlistId)

        if df is None or df.empty:
            raise HTTPException(status_code=400, detail="No tracks found")

        stats = df.describe().to_dict()
        recommendations = recommendSongs(df)

        return {
            "stats": stats,
            "recommendations": recommendations
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))