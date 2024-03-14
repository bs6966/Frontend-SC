from flask import Flask, request, jsonify
import ocr
import cv2
import pytesseract
import cloudinary
import cloudinary.uploader

app = Flask(__name__)

# Configure Cloudinary
cloudinary.config(
    cloud_name="dnvllz2vp",
    api_key="494111954798794",
    api_secret="dHWcShm4LHxlv3wd6mRgAtZzdJ4"
)

# Upload an image to Cloudinary
def upload_image(image_file):
    try:
        upload_data = cloudinary.uploader.upload(image_file, resource_type="auto")
        return upload_data
    except Exception as e:
        print(f"Error uploading image: {e}")
        return None

# Fetch the path of the uploaded image
def fetch_image_path(public_id):
    try:
        resource = cloudinary.api.resource(public_id)
        image_path = resource['secure_url']
        return image_path
    except Exception as e:
        print(f"Error fetching image path: {e}")
        return None

@app.route('/aadhar_ocr', methods=['POST'])
def aadhar_ocr():
    if 'picture' not in request.files:
        return jsonify({"Error": "No file in part"})
    file = request.files['picture']

    upload_result = upload_image(file)

    if not upload_result:
        return jsonify({"Error": "Failed to upload image"})

    public_id = upload_result['public_id']
    img_path = fetch_image_path(public_id)

    # img_path = "/Users/rohansonthalia/Downloads/Frontend-SC-main/IMG_0956.jpg"
    aadhar_ocr = ocr.Aadhar_OCR(img_path)
    data = aadhar_ocr.extract_data()

    return jsonify({
        'aadhar_no': data[0],
        'gender': data[1],
        'dob': data[2],
        'name': data[3]
    })

@app.route('/pan_ocr', methods=['POST'])
def pan_ocr():
    if 'picture' not in request.files:
        return jsonify({"Error": "No file in part"})
    file = request.files['picture']

    upload_result = upload_image(file)

    if not upload_result:
        return jsonify({"Error": "Failed to upload image"})

    public_id = upload_result['public_id']
    img_path = fetch_image_path(public_id)

    # img_path = "/Users/rohansonthalia/Downloads/Frontend-SC-main/unsharpen.jpg"
    pan_ocr = ocr.PAN_OCR(img_path)
    pan_no = pan_ocr.extract_data()

    return jsonify({'pan_no': pan_no})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(debug=True)