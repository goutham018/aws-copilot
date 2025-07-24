module.exports = {
  DYNAMODB_TABLE: process.env.DYNAMODB_TABLE || 'backend-table',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1'
};
