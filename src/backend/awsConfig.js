import AWS from 'aws-sdk';
import Config from 'react-native-config'; // Assuming you're using react-native-config

AWS.config.update({
    accessKeyId: Config.AWS_ACCESS_KEY,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    region: Config.AWS_REGION
});

export const s3 = new AWS.S3();
export const lambda = new AWS.Lambda();
