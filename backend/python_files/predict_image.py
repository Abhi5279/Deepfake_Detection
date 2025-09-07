import os
import sys
import tensorflow as tf
import numpy as np
from PIL import Image

# Suppress TF logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# ----------------------------
# Resolve absolute model path
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "image_model.h5")
MODEL_PATH = os.path.normpath(MODEL_PATH)

# ----------------------------
# Load the model
# ----------------------------
try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}", file=sys.stderr)
    sys.exit(1)

# ----------------------------
# Prediction function
# ----------------------------
IMG_SIZE = (64, 64)

def predict_image(image_path):
    img = Image.open(image_path).convert('RGB')
    img = img.resize(IMG_SIZE)
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = model.predict(img_array, verbose=0)
    confidence = float(prediction[0][0])
    label = 1 if confidence <= 0.5 else 0  # 1 = Real, 0 = Fake
    return label, confidence

# ----------------------------
# Script entry point
# ----------------------------
if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)

    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        sys.exit(1)

    label, confidence = predict_image(image_path)
    sys.stdout.write(f"{label}|{confidence}")
