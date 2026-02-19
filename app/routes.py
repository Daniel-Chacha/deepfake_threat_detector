from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import tempfile
import os
import cv2
from app.utils.validation import validate_file
from app.services.video import extract_frames
from app.services.face import detect_faces
from app.services.preprocess import preprocess_face
from app.services.inference import run_inference
from app.services.scoring import aggregate_scores

router = APIRouter()

@router.post("/detect")
async def detect_deepfake(file: UploadFile = File(...)):
    try:
        # Validate file
        media_type = validate_file(file)
        
        # Save to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        try:
            if media_type == 'video':
                frames = extract_frames(tmp_path)
            else:
                img = cv2.imread(tmp_path)
                if img is None:
                    raise HTTPException(status_code=400, detail="Invalid image file.")
                frames = [img]
            
            all_scores = []
            for frame in frames:
                faces = detect_faces(frame)
                for (x, y, w, h) in faces:
                    face_img = frame[y:y+h, x:x+w]
                    tensor = preprocess_face(face_img)
                    scores = run_inference(tensor)
                    all_scores.extend(scores)
            
            if all_scores:
                confidence, explanation = aggregate_scores(all_scores)
            else:
                confidence = 0.0
                explanation = "No faces detected in the media."
            
            return JSONResponse(content={"confidence": confidence, "explanation": explanation})
        
        finally:
            os.unlink(tmp_path)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")