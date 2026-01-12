import matplotlib.pyplot as plt
from spotify_client import getSpotifyClient
from analysis import analyzePlaylist
from recommend import recommendSongs

CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
PLAYLIST_ID = "YOUR_PLAYLIST_ID"


def main():
    sp = getSpotifyClient(CLIENT_ID, CLIENT_SECRET)
    df = analyzePlaylist(sp, PLAYLIST_ID)

    print("Playlist Summary:")
    print(df.describe())

    df.plot(kind="box")
    plt.title("Audio Feature Distribution")
    plt.show()

    recommendations = recommendSongs(df)
    print("Recommended Track Indices:", recommendations)


if __name__ == "__main__":
    main()
