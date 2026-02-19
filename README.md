# Deepfake Threat Detector

A FastAPI-based system to detect deepfakes in images and videos using MesoNet.

## Features

- Upload images or videos for deepfake detection
- Frame sampling for videos (max 30 frames)
- Face detection using OpenCV Haar cascades
- Preprocessing with normalization
- Inference using PyTorch MesoNet model
- Score aggregation with confidence and explanation

## Setup

1. Create and activate virtual environment:

   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Download the MesoNet model:
   - The model file `mesonet.pth` needs to be placed in `app/models/`
   - Since pre-trained PyTorch MesoNet is not readily available, you may need to convert from Keras or train it.
   - For now, the system uses dummy scores if model is not found.

4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API

- `GET /`: Root endpoint
- `POST /detect`: Upload file for detection
  - Form data: `file` (image or video)
  - Response: `{"confidence": float, "explanation": str}`

## Project Structure

```
deepfake-detector/
├── app/
│   ├── main.py              # FastAPI entry
│   ├── routes.py            # API endpoints
│   ├── services/
│   │     ├── video.py       # Frame extraction
│   │     ├── face.py        # Face detection
│   │     ├── preprocess.py  # Preprocessing
│   │     ├── inference.py   # Model inference
│   │     └── scoring.py     # Score aggregation
│   ├── models/
│   │     └── mesonet.pth    # Model file (to be added)
│   └── utils/
│         └── validation.py  # File validation
├── frontend/                # React app (separate)
├── requirements.txt
└── README.md
```
