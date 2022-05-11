FROM openjdk:11
ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
# Install dependencies
RUN apt-get update && apt-get install -y \
    pip \
    libglib2.0-0 \
    libgl1-mesa-glx \
    tesseract-ocr \
    && pip install \
    pillow \
    pytesseract \
    opencv-python
EXPOSE 8082
ENTRYPOINT ["java","-jar","/app.jar"]