from sklearn.metrics.pairwise import cosine_similarity


def recommendSongs(df, metadata, index=0, topN=5):
    similarity = cosine_similarity(df)

    scores = list(enumerate(similarity[index]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    results = []

    for i, score in scores[1:topN + 1]:
        results.append({
            "track": metadata[i]["name"],
            "artist": metadata[i]["artist"],
            "score": float(score)
        })

    return results
