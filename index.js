const request = require('sync-request');
const url = "https://raw.githubusercontent.com/hirohiro-kun/testrepo/master/index.js";
const response = request("GET", url);
const AWS = require('aws-sdk');
const bucketName = 'hk5gfree';
const fileName = "index.js";
const fileData = response.getBody().toString();
const s3 = new AWS.S3();

exports.handler = function(event, context, callback) {
    function upload_to_s3() {
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileData
        };
        s3.upload(params, function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                console.log(data);
            }
        });
    }
    upload_to_s3();
    return context.logStreamName;
};
