const BASE_URL = "http://localhost:8000";

export const analyzePlaylist = async (playlistUrl) => {
  try {
    const res = await fetch(
      `${BASE_URL}/analyze?playlistUrl=${encodeURIComponent(playlistUrl)}`
    );

    if (!res.ok) {
      throw new Error("API error");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};