const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "806342c6b97b44ac9ae5a024039ab72c",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(() => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(() => res.status(400).json("unable to get entries"));
};

module.exports = { handleImage, handleApiCall };
