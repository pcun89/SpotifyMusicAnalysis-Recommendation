import { useState } from "react";
import { analyzePlaylist } from "./api";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url) {
      setError("Please enter a playlist URL");
      return;
    }

    setLoading(true);
    setData(null);
    setError("");

    try {
      const result = await analyzePlaylist(url);
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze playlist. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎵 Spotify Analyzer</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          placeholder="Paste Spotify Playlist URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button style={styles.button} onClick={handleAnalyze}>
          Analyze
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {loading && <p style={styles.loading}>Analyzing playlist...</p>}

      {data && (
        <>
          <h2 style={styles.section}>🎧 Recommendations</h2>

          <div style={styles.grid}>
            {data.recommendations.map((rec, index) => (
              <div key={index} style={styles.card}>
                {rec.image && (
                  <img
                    src={rec.image}
                    alt="album cover"
                    style={styles.image}
                  />
                )}

                <p style={styles.song}>{rec.track}</p>
                <p style={styles.artist}>{rec.artist}</p>

                <p style={styles.score}>
                  Score: {rec.score.toFixed(3)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
    padding: "30px",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    color: "#1DB954",
    marginBottom: "30px"
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  input: {
    width: "400px",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    marginRight: "10px",
    outline: "none"
  },
  button: {
    backgroundColor: "#1DB954",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    textAlign: "center",
    color: "red"
  },
  loading: {
    textAlign: "center",
    color: "#b3b3b3"
  },
  section: {
    marginTop: "30px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    backgroundColor: "#181818",
    padding: "15px",
    borderRadius: "12px",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  song: {
    fontWeight: "bold",
    fontSize: "14px"
  },
  artist: {
    color: "#b3b3b3",
    fontSize: "13px"
  },
  score: {
    marginTop: "8px",
    color: "#1DB954",
    fontSize: "12px"
  }
};