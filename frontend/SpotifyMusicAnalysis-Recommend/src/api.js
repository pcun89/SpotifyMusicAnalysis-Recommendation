export const analyzePlaylist = async (playlistUrl) => {
  const response = await fetch(
    `http://127.0.0.1:8001/analyze?playlistUrl=${encodeURIComponent(playlistUrl)}`
  );

  if (!response.ok) {
    throw new Error("API Error");
  }

  return response.json();
};