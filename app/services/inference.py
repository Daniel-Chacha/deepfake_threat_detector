import os

model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'mesonet.pth')

model = None
try:
    import torch
    model = torch.load(model_path, map_location='cpu')
    model.eval()
except (FileNotFoundError, ImportError):
    print("Model file not found or PyTorch not installed. Using dummy inference.")

def run_inference(tensors):
    if model is None:
        return [0.5] * len(tensors)  # dummy
    with torch.no_grad():
        outputs = model(tensors)
        probs = torch.sigmoid(outputs).squeeze().tolist()
        if not isinstance(probs, list):
            probs = [probs]
    return probs