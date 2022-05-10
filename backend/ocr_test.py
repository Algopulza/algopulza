from PIL import Image
from urllib import request
from io import BytesIO
import pytesseract
import cv2
import sys
import os

print("start ocr")

url = sys.argv[1]
res = request.urlopen(url).read()
img = Image.open(BytesIO(res))

print(res)

image = cv2.imread(img)
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

text = pytesseract.image_to_string(rgb_image, lang = 'eng+kor', config = '--oem 3 --psm 11')

print(text)

print("finish ocr")