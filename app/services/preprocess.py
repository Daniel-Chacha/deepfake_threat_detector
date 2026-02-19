import cv2
import torch
from torchvision import transforms

def preprocess_face(face_img):
    # Resize to 256x256
    face_img = cv2.resize(face_img, (256, 256))
    # Convert BGR to RGB
    face_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2RGB)
    # Normalize to 0-1
    face_img = face_img / 255.0
    # To tensor and normalize
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    tensor = transform(face_img).unsqueeze(0)  # Add batch dim
    return tensor