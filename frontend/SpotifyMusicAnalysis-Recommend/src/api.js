const API_URL = "https://spotify-backend-364529009702.us-central1.run.app";

/**
 * Calls backend API to analyze playlist
 * @param {string} playlistUrl
 * @returns {Promise<Object>}
 */
export const analyzePlaylist = async (playlistUrl) => {
  const response = await fetch(
    `${API_URL}/analyze?playlistUrl=${encodeURIComponent(playlistUrl)}`
  );

  if (!response.ok) {
    throw new Error("API Error");
  }

  return response.json();
};