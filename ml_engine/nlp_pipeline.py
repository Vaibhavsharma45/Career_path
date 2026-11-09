"""
NLP Pipeline for CareerPath Project
Handles text cleaning, tokenization, normalization, and TF-IDF feature extraction.
"""

import re
import string
from sklearn.feature_extraction.text import TfidfVectorizer

def clean_text(text: str) -> str:
    """
    Cleans and normalizes raw user natural-language text.
    - Lowercases text
    - Removes URLs and special punctuation
    - Normalizes extra whitespace
    """
    if not isinstance(text, str):
        return ""
    text = text.lower()
    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)
    # Remove punctuation except hyphens inside words
    text = re.sub(r'[^a-zA-Z0-9\s-]', ' ', text)
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def build_vectorizer(max_features=350, ngram_range=(1, 2)):
    """
    Constructs a TF-IDF vectorizer configured for career interest extraction.
    Uses sublinear term frequency scaling and English stop-word removal.
    """
    return TfidfVectorizer(
        preprocessor=clean_text,
        stop_words='english',
        ngram_range=ngram_range,
        max_features=max_features,
        sublinear_tf=True
    )
