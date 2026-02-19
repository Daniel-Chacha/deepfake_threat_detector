def validate_file(file):
    if file.filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
        return 'video'
    elif file.filename.lower().endswith(('.jpg', '.png', '.jpeg', '.bmp')):
        return 'image'
    else:
        raise ValueError("Unsupported file type. Supported: mp4, avi, mov, mkv, jpg, png, jpeg, bmp")