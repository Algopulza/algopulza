from PIL import Image
from urllib import request
from io import BytesIO
import pytesseract
import cv2
import sys
import os

url = sys.argv[1]

image = cv2.imread(url)
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

text = pytesseract.image_to_string(rgb_image, lang = 'eng+kor', config = '--oem 3 --psm 11')

a = text.find("아이디")
b = text.find("상태")

if a>-1 and b>-1:
    bojId = text[a+3 : b].strip()
    print(bojId)
else:
    print("fail")



