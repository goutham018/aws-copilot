import express from 'express';
import cors from 'cors';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import config from '../../shared/config/env.js';

const app = express();
app.use(cors());
app.use(express.json());

// DynamoDB client setup
const ddbClient = new DynamoDBClient({ region: config.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);
const TABLE_NAME = config.DYNAMODB_TABLE;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all items from DynamoDB
app.get('/api/items', async (req, res) => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    res.json(data.Items || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
