from flask import Flask, request, jsonify
import ocr
import cv2
import pytesseract

app = Flask(__name__)

@app.route('/aadhar_ocr', methods=['POST'])
def aadhar_ocr():
    if 'picture' not in request.files:
        return jsonify({"Error": "No file in part"})
    file = request.files['picture']
    img_path = f'tmp/{file.filename}'
    file.save(img_path)

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
    img_path = f'tmp/{file.filename}'
    file.save(img_path)

    pan_ocr = ocr.PAN_OCR(img_path)
    pan_no = pan_ocr.extract_data()

    return jsonify({'pan_no': pan_no})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(debug=True)