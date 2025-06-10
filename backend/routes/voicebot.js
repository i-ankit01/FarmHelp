// server.js
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const router = express.Router();
const path = require('path');

const app = express()
app.use(bodyParser.json());


const PROJECT_ID = 'farm-helpchatbot-vtgj';


const KEYFILE_PATH = path.join(__dirname, 'farm-help.json');
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: KEYFILE_PATH,
});

router.post('/detect-intent', async (req, res) => {
  const userMessage = req.body.message;
  const sessionId = uuid.v4();
  const sessionPath = sessionClient.sessionPath(PROJECT_ID, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({
      intent: result.intent.displayName,
      response: result.fulfillmentText,
      parameters: result?.parameters?.fields?.number?.numberValue || null
      });
    // res.json(result)
  } catch (err) {
    console.error('Dialogflow error:', err);
    res.status(500).send('Error detecting intent');
  }
});

module.exports = router;
