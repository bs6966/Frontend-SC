from flask import Flask 
from flask_restful import Api, Resource 
import speech_recognition as sr

app = Flask(__name__) 

api = Api(app) 

def english():
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


if __name__=='__main__': 
	app.run(debug=True)
