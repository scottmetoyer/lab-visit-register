'use strict';
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
var uuidv1 = require('uuid/v1');
var utility = require('utility');

module.exports.handler = (event, context, callback) => {
  var tableName = process.env.VISITS_TABLE;
  let id = (event.pathParameters !== null ? event.pathParameters.project : false);

  switch (event.httpMethod) {
    case "GET":
      if (id) {
        getItem(id);
      } else {
        getAllItems();
      }
      break;

    case "POST":
    case "PUT":
      saveItem(id);
      break;

    case "DELETE":
      deleteItem(id);
      break;

    default:
      utility.sendResponse(501, { "Error": "Unsupported HTTP method(" + event.httpMethod + ")" }, callback);
  }

  function saveItem(id) {
    var item = {};
    var datetime = new Date().getTime().toString();
    var params = JSON.parse(event.body);

    id ? item.id = id : item.id = uuidv1();
    item.timestamp = datetime;

    params.visitor != null ? item.visitor = params.visitor : null;
    params.reasonForVisit != null ? item.reasonForVisit = params.reasonForVisit : null;

    // Attempt to parse out the SID from the raw visitor string
    if (item.visitor) {
      var sid = '';
      // item.sid = sid;
    }

    docClient.put({
      "TableName": tableName,
      "Item": item
    },
      function (err, data) {
        utility.sendResponse(err, data, callback);
      });
  }

  function deleteItem(id) {
    docClient.deleteItem({
      TableName: tableName,
      Key: {
        "id": {
          "S": id
        }
      }
    },
      function (err, data) {
        utility.sendResponse(err, data, callback);
      });
  }

  function getItem(id) {
    docClient.get({
      TableName: tableName,
      Key: {
        "id": id
      }
    },
      function (err, data) {
        utility.sendResponse(err, data, callback);
      });
  }

  function getAllItems() {
    var params = { TableName: tableName };

    /*
    // Boilerplate code for filtering items based on a path parameter

    if (event['pathParameters'] && event['pathParameters']['department']) {
      params.FilterExpression = '#department = :d',
        params.ExpressionAttributeValues = { ':d': event['pathParameters']['department'] },
        params.ExpressionAttributeNames = { "#department": "department" };
    }
    */

    docClient.scan(
      params,
      function (err, data) {
        utility.sendResponse(err, data, callback);
      });
  }
};