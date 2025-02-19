const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Player = sequelize.define("Player", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    photoUrl: { type: DataTypes.STRING, allowNull: false },
    birthplace: { type: DataTypes.STRING, allowNull: false },
    careerInfo: { type: DataTypes.TEXT, allowNull: false },
    matches: { type: DataTypes.INTEGER, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
    fitness: { type: DataTypes.STRING, allowNull: false },
    centuries: { type: DataTypes.INTEGER, allowNull: false },
    wickets: { type: DataTypes.INTEGER, allowNull: false },
    average: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    timestamps: false,
}
);

sequelize.sync()
    .then(() => {
        console.log('Player table created');
    })
    .catch(err => console.log('Error: ' + err));
  
module.exports = Player;
