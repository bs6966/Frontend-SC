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

def upload_image(image_file):
    try:
        upload_data = cloudinary.uploader.upload(image_file, resource_type="auto")
        if isinstance(upload_data, list) or isinstance(upload_data, dict):
            # If upload_data is a list or dict, it means the upload was successful
            return upload_data
        else:
            print(f"Unexpected upload response: {upload_data}")
            return None
    except Exception as e:
        print(f"Error uploading image: {e}")
        return None

# Fetch the path of the uploaded image
def fetch_image_path(public_id):
    try:
        resource = cloudinary.utils.cloudinary_url(public_id, resource_type="image")[0]
        image_path = resource
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

    pan_ocr = ocr.PAN_OCR(img_path)
    pan_no = pan_ocr.extract_data()

    return jsonify({'pan_no': pan_no})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'})
    
def english():
r = sr.Recognizer()
b=True
while b==True:
    with sr.Microphone() as source:
        print("State your answer")
        r.adjust_for_ambient_noise(source, duration=1)
    audio = r.listen(source)
        try:
            print("Recognizing...")
            text = r.recognize_google(audio) 
            b=False
            return text
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))
text_english=english()
class english(Resource): 
	def get(self): 
		data={ 
			'text':text_english,
		} 
		return data 

api.add_resource(english,'/english') 

def hindi():
    r = sr.Recognizer()
    b=True
    # Capture audio from the microphonE
    while b==True:
        with sr.Microphone() as source:
            print("State your answer")
            r.adjust_for_ambient_noise(source, duration=1)
            audio = r.listen(source)

        # Perform speech recognition
        try:
            print("Recognizing...")
            text = r.recognize_google(audio, language='hi-In') 
            b=False
            return text
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))
text_hindi=hindi()
class hindi(Resource): 
	def get(self): 
		data={ 
			'text':text_hindi,
		} 
		return data 

api.add_resource(hindi,'/hindi') 


if __name__ == '__main__':
    app.run(debug=True)
