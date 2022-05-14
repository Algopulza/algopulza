from PIL import Image
from urllib import request
from io import BytesIO
import pytesseract
import cv2
import sys
import os

pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

url = sys.argv[1]

image = cv2.imread(url)
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# 이미지에서 텍스트 인식
text = pytesseract.image_to_string(rgb_image, lang = 'eng+kor', config = '--oem 3 --psm 11')
print(text)
# 인식된 텍스트를 공백 기준으로 구분
textList = text.split()
print(text.split())

# 리스트에서 "아이디" 찾기
try:
    idIndex = textList.index('아이디')
except :
   print("fail")
else :
    # 정상적으로 인식되었으면
    bojId = textList[idIndex+1]
    print(bojId)



