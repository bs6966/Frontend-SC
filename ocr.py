import requests
import re
import cv2
import pytesseract

def extract_text_from_image(image_path, api_key):
    cloud_url = image_path
    response = requests.get(cloud_url)
    # OCR.space API endpoint
    api_endpoint = "https://api.ocr.space/parse/image"
    
    # API parameters
    payload = {
        "apikey": api_key,
        "language": "eng",  # Change the language code as needed
    }

    # Read image file
    with open("image.jpg", "wb") as f:
        f.write(response.content)
        
    files = {"image": open("image.jpg", "rb")}
    response = requests.post(api_endpoint,
                                 files=files,
                                 data=payload)
    
    # Parse response JSON
    response_data = response.json()
    
    # Check if response is successful
    if response_data["IsErroredOnProcessing"]:
        print("Error occurred during processing:")
        print(response_data["ErrorMessage"])
        return None
    
    # Extract text from response
    extracted_text = response_data["ParsedResults"][0]["ParsedText"]
    return extracted_text

def extract_information(text):
    # Define regular expressions for name, date, and 12-digit number
    name_pattern = r"(?i)\b(?:name|pres)?:?\s*([A-Za-z\s]+)"
    date_pattern = r"(?i)\b(?:dob|date of birth)?:?\s*([\d/]+)"
    number_pattern = r"\b\d{4}\s+\d{4}\s+\d{4}\b"

    # Match patterns in the text
    name_match = re.search(name_pattern, text)
    date_match = re.search(date_pattern, text)
    number_match = re.search(number_pattern, text)

    # Extract matched groups
    name = name_match.group(1).strip() if name_match else None
    date = date_match.group(1).strip() if date_match else None
    number = number_match.group() if number_match else None

    return name, date, number

class Aadhar_OCR:
    def __init__(self, img_path):
        self.user_aadhar_no = str()
        self.user_gender = str()
        self.user_dob = str()
        self.user_name = str()

        self.img_name = img_path
    
    def extract_data(self):

        response = requests.get(self.img_name)
        if response.status_code == 200:
            # Load the image data into a numpy array
            image_data = np.frombuffer(response.content, np.uint8)
            # Decode the image data using OpenCV
            img = cv2.imdecode(image_data, cv2.IMREAD_COLOR)

        # Reading the image, extracting text from it, and storing the text into a list.
        # img = cv2.imread(self.img_name)
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, threshold_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        text = pytesseract.image_to_string(threshold_image)
        all_text_list = re.split(r'[\n]', text)
        
        # Process the text list to remove all whitespace elements in the list.
        text_list = list()
        for i in all_text_list:
            if re.match(r'^(\s)+$', i) or i=='':
                continue
            else:
                text_list.append(i)

        # Extracting all the necessary details from the pruned text list.
        # 1) Aadhar Card No.
        aadhar_no_pat = r"\b\d{4}\s+\d{4}\s+\d{4}\b"
        number_match = re.search(aadhar_no_pat, text)
        self.user_aadhar_no = number_match.group() if number_match else None

        # for i in text_list:
        #     if re.match(aadhar_no_pat, i):
        #         self.user_aadhar_no = i
        #     else:
        #         continue

        # 2) Gender
        aadhar_male_pat = r'(Male|MALE|male)$'
        aadhar_female_pat = r'[(Female)(FEMALE)(female)]$'
        for i in text_list:
            if re.search('(Female|FEMALE|female)$', i):
                self.user_gender = 'FEMALE'
            elif re.search('(Male|male|MALE|Mate)$', i):
                self.user_gender = 'MALE'
            
            else:
                continue

        # 3) DOB
        aadhar_dob_pat = r'(Year|Birth|irth|YoB|YOB:|DOB:|DOB)'
        date_ele = str()
        for idx, i in enumerate(text_list):
            if re.search(aadhar_dob_pat, i):
                index = re.search(aadhar_dob_pat, i).span()[1]
                date_ele = i
                dob_idx = idx
            else:
                continue

        date_str=''
        for i in date_ele[index:]:
            if re.match(r'\d', i):
                date_str = date_str+i
            elif re.match(r'/', i):
                date_str = date_str+i
            else:
                continue
        self.user_dob = date_str

        # 4) Name
        self.user_name = text_list[dob_idx-1]

        api_key = "K89709702488957"
        if self.user_aadhar_no == None:
          _,_, self.user_aadhar_no = extract_information(extract_text_from_image(self.img_name, api_key))
        
        return [self.user_aadhar_no, self.user_gender, self.user_dob, self.user_name]

class PAN_OCR:
    def __init__(self, img_path):
        self.user_pan_no = str()
        self.img_name = img_path
    
    def extract_data(self):

        response = requests.get(self.img_name)
        if response.status_code == 200:
            # Load the image data into a numpy array
            image_data = np.frombuffer(response.content, np.uint8)
            # Decode the image data using OpenCV
            img = cv2.imdecode(image_data, cv2.IMREAD_COLOR)

        # Reading the image, extracting text from it, and storing the text into a list.
        gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        denoised_image = cv2.GaussianBlur(gray_image, (5, 5), 0)
        # _, threshold_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        text = pytesseract.image_to_string(denoised_image)

        # print(text)

        all_text_list = re.split(r'[\n]', text)
        # print(all_text_list)
        # Process the text list to remove all whitespace elements in the list.
        text_list = list()
        for i in all_text_list:
            if re.match(r'^(\s)+$', i) or i=='':
                continue
            else:
                text_list.append(i)
        # print(text_list)
        # Extracting all the necessary details from the pruned text list.
        # 1) PAN Card No.
        pan_no_pat = r'Permanent Account Number Card|Permanent Account Number|Permanent Account|Permanent|Permanent Account Nur:'
        pan_no = str()
        for i, text in enumerate(text_list):
            if re.match(pan_no_pat, text):
                pan_no = text_list[i+1]
            else:
                continue

        for i in pan_no:
            if i.isalnum():
                self.user_pan_no = self.user_pan_no + i
            else:
                continue 
        return self.user_pan_no


import cloudinary
import cloudinary.uploader
import cloudinary.utils
import cv2
import numpy as np

cloudinary.config(
    cloud_name="dnvllz2vp",
    api_key="494111954798794",
    api_secret="dHWcShm4LHxlv3wd6mRgAtZzdJ4"
)

# obj = Aadhar_OCR("http://res.cloudinary.com/dnvllz2vp/image/upload/oybked46vm79vh9webpa")
# print(obj.extract_data())