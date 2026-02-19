import numpy as np

def aggregate_scores(scores):
    if not scores:
        return 0.0, "No scores available."
    avg_score = np.mean(scores)
    confidence = float(avg_score)
    if confidence > 0.8:
        explanation = "Strong indication of deepfake manipulation. The media shows high levels of artificial alteration."
    elif confidence > 0.6:
        explanation = "Moderate suspicion of deepfake. Some inconsistencies detected that may indicate manipulation."
    elif confidence > 0.4:
        explanation = "Low confidence in authenticity. Minor anomalies suggest possible tampering."
    else:
        explanation = "Appears authentic. No significant signs of deepfake detected."
    return confidence, explanation