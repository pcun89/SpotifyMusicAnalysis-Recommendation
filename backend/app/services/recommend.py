from sklearn.metrics.pairwise import cosine_similarity


def recommendSongs(df, index=0, topN=5):
    similarity = cosine_similarity(df)
    scores = list(enumerate(similarity[index]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    return [
        {"track_index": i, "score": float(score)}
        for i, score in scores[1:topN + 1]
    ]