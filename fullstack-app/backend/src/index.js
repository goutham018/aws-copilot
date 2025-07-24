const express = require('express');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { DYNAMODB_TABLE, AWS_REGION } = require('../../shared/config/env');

const app = express();
app.use(express.json());

const client = new DynamoDBClient({ region: AWS_REGION });

app.post('/item', async (req, res) => {
  const { id, value } = req.body;
  try {
    await client.send(new PutItemCommand({
      TableName: DYNAMODB_TABLE,
      Item: {
        id: { S: id },
        value: { S: value }
      }
    }));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));
