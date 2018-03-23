'use strict';

module.exports.sendResponse = function(err, data, callback) {
    if (err) {
      callback(null, {
        "isBase64Encoded": false,
        "statusCode": 400,
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(err)
      });
    } else {
      callback(null, {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(data)
      });
    }
  };