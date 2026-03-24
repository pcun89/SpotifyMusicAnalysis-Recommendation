import { useState } from "react";
import { analyzePlaylist } from "./api";
import { motion } from "framer-motion";

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

        {/* 🔥 Motion Button */}
        <motion.button
          style={styles.button}
          onClick={handleAnalyze}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Analyze
        </motion.button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Analyzing...</p>}

      {data && (
        <div style={styles.results}>
          <h2>Recommended Tracks</h2>

          <div style={styles.grid}>
            {data.recommendations.map((rec, i) => (
              /* 🔥 Motion Card */
              <motion.div
                key={i}
                style={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.7)"
                }}
              >
                <img src={rec.image} style={styles.image} />

                <div style={styles.cardContent}>
                  <p style={styles.track}>{rec.name}</p>
                  <p style={styles.artist}>{rec.artist}</p>
                </div>
              </motion.div>
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
    cursor: "pointer"
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
    cursor: "pointer"
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },

  cardContent: {
    padding: "10px"
  },

  track: {
    fontWeight: "bold",
    fontSize: "14px"
  },

  artist: {
    color: "#b3b3b3",
    fontSize: "13px"
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