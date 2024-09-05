const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { verifyToken } = require('../middleware/authMiddleware'); // Assuming you have this middleware
const Media = require('../models/Media'); // Assuming you have a Media model
require('dotenv').config();

const router = express.Router();

// Configure AWS SDK
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const myBucket = process.env.AWS_BUCKET_NAME;

// Configure Multer storage for memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading images from Secure Vault
router.post('/uploadVaultImage', verifyToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const key = `${Date.now().toString()}-${req.file.originalname}`;
        const uploadParams = {
            Bucket: myBucket,
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            ACL: 'bucket-owner-full-control',
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        const fileUrl = `https://${myBucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        // Optionally save the metadata in the database
        const newMedia = new Media({
            userId: req.user.user_id,
            filePath: fileUrl,
            fileName: key,
            mimeType: req.file.mimetype,
        });
        await newMedia.save();

        res.status(201).json({ message: 'File uploaded successfully', fileUrl });
    } catch (error) {
        res.status(500).json({ message: "Error uploading file.", error });
    }
});

module.exports = router;
