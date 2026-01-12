from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def recommendSongs(df, index=0, topN=5):
    """
    Recommends songs based on cosine similarity.
    """
    similarity = cosine_similarity(df)
    scores = list(enumerate(similarity[index]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    return scores[1:topN + 1]
