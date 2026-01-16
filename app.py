import streamlit as st
import matplotlib.pyplot as plt
from spotify_client import getSpotifyClient
from analysis import analyzePlaylist
from recommend import recommendSongs

st.set_page_config(page_title="Spotify Music Analyzer")

st.title("🎵 Spotify Playlist Analyzer")

clientId = st.secrets["CLIENT_ID"]
clientSecret = st.secrets["CLIENT_SECRET"]

playlistUrl = st.text_input("Enter Spotify Playlist URL")


def extractPlaylistId(url):
    return url.split("/")[-1].split("?")[0]


if st.button("Analyze Playlist"):
    sp = getSpotifyClient(clientId, clientSecret)
    playlistId = extractPlaylistId(playlistUrl)

    df = analyzePlaylist(sp, playlistId)

    # 🔒 NEW: Defensive guard (ADD THIS BLOCK)
    if df is None or df.empty:
        st.error(
            "Unable to access this playlist. "
            "Please make sure it is public and API-accessible."
        )
        st.stop()

    # Existing code continues safely
    st.subheader("Playlist Statistics")
    st.dataframe(df.describe())

    st.subheader("Audio Feature Distribution")
    fig, ax = plt.subplots()
    df.plot(kind="box", ax=ax)
    st.pyplot(fig)

    st.subheader("Recommended Songs")
    recommendations = recommendSongs(df)
    st.write(recommendations)


