package com.algopulza.backend.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷 이름

    @Value("${cloud.aws.s3.hosting}")
    public String hosting;  // S3 정적 호스팅 이름

    @Value("${cloud.aws.s3.dir-member}")
    public String dirMember;  // S3  dir 이름


    public String uploadToMember(MultipartFile file) {
        return uploadToS3(file, dirMember);
    }

    private String uploadToS3(MultipartFile file, String dir) {

        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        ObjectMetadata objMeta = new ObjectMetadata();

        try {
            byte[] bytes = IOUtils.toByteArray(file.getInputStream());
            objMeta.setContentLength(bytes.length);
            ByteArrayInputStream byteArrayIs = new ByteArrayInputStream(bytes);

            amazonS3Client.putObject(new PutObjectRequest(bucket, dir + "/" + fileName, byteArrayIs, objMeta));

        } catch (IOException e) {
            e.printStackTrace();
        }

        String path = amazonS3Client.getUrl(bucket, dir + "/" + fileName).getPath();
        path = hosting + path;
        return path;
    }

}
