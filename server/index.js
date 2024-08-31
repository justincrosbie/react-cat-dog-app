const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

// Generate a larger set of facts
const generateFacts = (count) => {
  const facts = [];
  for (let i = 0; i < count; i++) {
    facts.push({
      _id: `fact_${i}`,
      __v: 0,
      text: `This is ${i % 2 === 0 ? 'a cat' : 'a dog'} fact number ${i + 1}.`,
      updatedAt: new Date().toISOString(),
      deleted: false,
      source: i % 2 === 0 ? 'cat' : 'dog',
      sentCount: Math.floor(Math.random() * 10)
    });
  }
  return facts;
};

const allFacts = generateFacts(1000); // Generate 1000 facts

app.get('/facts/random', (req, res) => {
  const { animal_type, amount = 10 } = req.query;
  let filteredFacts = allFacts;

  const this_type = animal_type || 'cat';

  if (this_type !== 'cat,dog') {
    filteredFacts = allFacts.filter(fact => fact.source === this_type);
  }

  const randomFacts = [];
  const numFacts = Math.min(parseInt(amount), filteredFacts.length);

  for (let i = 0; i < numFacts; i++) {
    const randomIndex = Math.floor(Math.random() * filteredFacts.length);
    randomFacts.push(filteredFacts[randomIndex]);
    filteredFacts.splice(randomIndex, 1);
  }

  res.json(randomFacts);
});

app.listen(port, () => {
  console.log(`Local API server running at http://localhost:${port}`);
});
