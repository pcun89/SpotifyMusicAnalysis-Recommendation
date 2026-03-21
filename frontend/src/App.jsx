import { useState } from "react";
import { analyzePlaylist } from "./api";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await analyzePlaylist(url);
      setData(result);
    } catch (err) {
      setError("Failed to analyze playlist.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎵 Spotify Music Analyzer</h1>

      <input
        type="text"
        placeholder="Enter Spotify Playlist URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "400px",
          padding: "8px",
          marginRight: "10px"
        }}
      />

      <button onClick={handleAnalyze} style={{ padding: "8px 12px" }}>
        Analyze
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <h2>📊 Playlist Statistics</h2>
          <pre>{JSON.stringify(data.stats, null, 2)}</pre>

          <h2>🎧 Recommendations</h2>
          <ul>
            {data.recommendations.map((rec, index) => (
              <li key={index}>
                Track Index: {rec.track_index} | Score:{" "}
                {rec.score.toFixed(3)}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}