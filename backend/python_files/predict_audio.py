import os
import sys
import numpy as np
import librosa
from tensorflow.keras.models import load_model
from PIL import Image

# Suppress TF logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# ----------------------------
# Resolve absolute model path
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "audio_model.h5")  # your audio CNN model
MODEL_PATH = os.path.normpath(MODEL_PATH)

# ----------------------------
# Load the model
# ----------------------------
try:
    model = load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}", file=sys.stderr)
    sys.exit(1)

# ----------------------------
# Audio preprocessing
# ----------------------------
IMG_SIZE = (128, 128)

def preprocess_audio(audio_file, sr_target=16000):
    # Load audio as mono
    y, sr = librosa.load(audio_file, sr=sr_target, mono=True)
    
    # Generate Mel-spectrogram
    S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128)
    S_dB = librosa.power_to_db(S, ref=np.max)

    # Normalize
    S_norm = (S_dB - S_dB.min()) / (S_dB.max() - S_dB.min())

    # Resize to model input
    S_resized = np.array(Image.fromarray(S_norm).resize(IMG_SIZE))

    # Convert to 3 channels
    S_rgb = np.stack([S_resized]*3, axis=-1)

    # Add batch dimension
    input_data = np.expand_dims(S_rgb, axis=0)
    return input_data.astype(np.float32)

# ----------------------------
# Predict audio function
# ----------------------------
def predict_audio(audio_path):
    if not os.path.exists(audio_path):
        print(f"File not found: {audio_path}", file=sys.stderr)
        return None, None

    input_data = preprocess_audio(audio_path)
    pred = model.predict(input_data, verbose=0)[0][0]
    
    # 1 = Fake, 0 = Real
    label = 1 if pred > 0.5 else 0
    return label, float(pred)

# ----------------------------
# Script entry point
# ----------------------------
if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)

    audio_path = sys.argv[1]
    label, confidence = predict_audio(audio_path)
    if label is not None:
        sys.stdout.write(f"{label}|{confidence}")
