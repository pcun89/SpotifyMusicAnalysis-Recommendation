import { useState } from "react";
import { analyzePlaylist } from "./api";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url) {
      setError("Enter a playlist URL");
      return;
    }

    setLoading(true);
    setData(null);
    setError("");

    try {
      const result = await analyzePlaylist(url);
      setData(result);
    } catch (err) {
      setError("Failed to analyze playlist");
    }

    setLoading(false);
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Spotify Analyzer</h1>
      </div>

      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Paste Spotify Playlist..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleAnalyze}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Analyze
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Analyzing...</p>}

      {data && (
        <div style={styles.results}>
          <h2>Recommended Tracks</h2>

          <div style={styles.grid}>
            {data.recommendations.map((rec, i) => (
              <div
                key={i}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img src={rec.image} style={styles.image} />

                <div style={styles.cardContent}>
                  <p style={styles.track}>{rec.name}</p>
                  <p style={styles.artist}>{rec.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    background: "linear-gradient(to bottom, #121212, #000)",
    minHeight: "100vh",
    color: "white",
    fontFamily: "sans-serif",
    padding: "20px"
  },

  header: {
    textAlign: "center",
    marginBottom: "30px"
  },

  logo: {
    color: "#1DB954",
    fontSize: "32px"
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    width: "400px",
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    outline: "none"
  },

  button: {
    background: "#1DB954",
    border: "none",
    padding: "12px 20px",
    borderRadius: "20px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  results: {
    marginTop: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#181818",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },

  image: {
    width: "100%"
  },

  cardContent: {
    padding: "10px"
  },

  track: {
    fontWeight: "bold"
  },

  artist: {
    color: "#b3b3b3"
  },

  error: {
    textAlign: "center",
    color: "red"
  },

  loading: {
    textAlign: "center",
    color: "#aaa"
  }
};