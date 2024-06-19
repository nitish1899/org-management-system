require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

sequelize.sync();

// Use the routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
