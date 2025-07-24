// Shared environment config
export default {
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  DYNAMODB_TABLE: process.env.DYNAMODB_TABLE || 'YourDynamoDBTableName',
};
