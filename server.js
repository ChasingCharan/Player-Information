const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/players', playerRoutes);

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch(err => console.log('Error: ' + err));
