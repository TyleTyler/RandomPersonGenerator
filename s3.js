const S3 = require('aws-sdk/clients/s3')
const bucketName ="randomgenpfp"
const region = "us-east-1"
const accessKeyId ="AKIA475CVX7EHV3JN6FG"
const secretAccessKey ="60PpF1b327f4xQQZ8t/xpm8HeuTzzE"
const S3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

//uploads a file to s3



//downloads a file from s3