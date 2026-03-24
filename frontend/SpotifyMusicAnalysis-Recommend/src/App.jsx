import { useState } from "react";
import { analyzePlaylist } from "./api";
import { motion } from "framer-motion";

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleAnalyze = async () => {
    if (!url) return;

    const result = await analyzePlaylist(url);
    setData(result);
  };

  return (
    <div style={styles.layout}>

      {/* 🔥 SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarLogo}>Spotify</h2>
        <p style={styles.navItem}>Home</p>
        <p style={styles.navItem}>Search</p>
        <p style={styles.navItem}>Your Library</p>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div style={styles.main}>

        {/* 🌈 GRADIENT HEADER */}
        <div style={styles.header}>
          <h1>Playlist Analyzer</h1>

          <div style={styles.searchBox}>
            <input
              style={styles.input}
              placeholder="Paste playlist..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <motion.button
              style={styles.button}
              onClick={handleAnalyze}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze
            </motion.button>
          </div>
        </div>

        {/* 🎧 TRACK GRID */}
        <div style={styles.grid}>
          {data &&
            data.recommendations.map((rec, i) => (
              <motion.div
                key={i}
                style={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.preventDefault();       // 🚫 stop redirect
                  setCurrentTrack(rec);     // 🎵 update player
                }}
              >
                <div style={styles.imageWrapper}>
                  <img
                    src={rec.image}
                    style={styles.image}
                    alt="album"
                  />

                  {/* ▶️ PLAY BUTTON */}
                  <motion.div
                    style={styles.playButton}
                    whileHover={{ scale: 1.2 }}
                    onClick={(e) => {
                      e.stopPropagation();  // 🚫 prevent double trigger
                      setCurrentTrack(rec);
                    }}
                  >
                    ▶
                  </motion.div>
                </div>

                <p style={styles.track}>{rec.name}</p>
                <p style={styles.artist}>{rec.artist}</p>
              </motion.div>
            ))}
        </div>
      </div>

      {/* 🎵 STICKY PLAYER */}
      {currentTrack && (
        <div style={styles.player}>
          <img src={currentTrack.image} style={styles.playerImg} />
          <div>
            <p>{currentTrack.name}</p>
            <p style={{ color: "#b3b3b3" }}>{currentTrack.artist}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    height: "100vh",
    background: "#000",
    color: "white",
    fontFamily: "sans-serif"
  },

  sidebar: {
    width: "200px",
    background: "#000",
    padding: "20px"
  },

  sidebarLogo: {
    color: "#1DB954"
  },

  navItem: {
    marginTop: "20px",
    cursor: "pointer",
    color: "#b3b3b3"
  },

  main: {
    flex: 1,
    overflowY: "auto"
  },

  header: {
    padding: "30px",
    background: "linear-gradient(to bottom, #1DB954, #121212)"
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "20px",
    border: "none",
    width: "300px"
  },

  button: {
    background: "#1DB954",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    color: "white",
    cursor: "pointer"
  },

  grid: {
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#181818",
    padding: "10px",
    borderRadius: "10px",
    position: "relative"
  },

  imageWrapper: {
    position: "relative"
  },

  image: {
    width: "100%",
    borderRadius: "8px"
  },

  playButton: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    background: "#1DB954",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
    cursor: "pointer"
  },

  track: {
    marginTop: "10px",
    fontWeight: "bold"
  },

  artist: {
    color: "#b3b3b3",
    fontSize: "14px"
  },

  player: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#181818",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  playerImg: {
    width: "50px"
  }
};