const AWS = require('aws-sdk')
const fs = require('fs')


const bucketName ="randomgenpfp"
const region = "us-east-1"
const accessKeyId ="AKIA475CVX7ECTXYOYNV"
const secretAccessKey ="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"
const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
})

//uploads a file to s3
function uploadPfp(filePath, personName){
    const fileStream = fs.createReadStream(filePath)

    const uplaodParams = {
        Bucket : bucketName,
        Body : fileStream,
        Key : personName
    }

    return s3.putObject(uplaodParams).promise()
}


exports.uploadPfp = uploadPfp

//downloads a file from s3

function getFile(fileKey){
    downloadParams = {
        Key : fileKey,
        Bucket : bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}

exports.getFile = getFile 
