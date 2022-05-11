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

a = text.find("맞은 문제")
b = text.find("시 도 했지만 맞지 못한 문제")

if a>-1 and b>-1:
    solved = text[a+5 : b].strip().split()
    tried = text[b+16 : ].strip().split()
    solvedList = list(map(int, solved))
    triedList = list(map(int,tried))
    print("success")
    print(solvedList)
    print(triedList)
else:
    print("fail")



