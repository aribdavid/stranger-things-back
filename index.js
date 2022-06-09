const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());
const { PORT, UPSIDEDOWN_MODE } = process.env;
const hereIsTheUpsideDown = UPSIDEDOWN_MODE === 'true';

app.get('/', (request, response) => {
  const characters = strangerThingsService.search(
    request.query,
    hereIsTheUpsideDown,
  );

  response.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
