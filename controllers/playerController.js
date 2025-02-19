const Player = require('../models/playerModel');

exports.addPlayer = async (req, res) => {
  const player = req.body;
  try {
    const newPlayer = await Player.create(player);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPlayerByName = async (req, res) => {
  const name = req.query.name;
  try {
    const player = await Player.findOne({ where: { name } });
    if (!player) {
      throw new Error('Player not found');
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getPlayerById = async (req, res) => {
    const id = req.params.id;
    try {
        const player = await Player.findByPk(id);
        if (!player) {
        throw new Error('Player not found');
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.updatePlayer = async (req, res) => {
  const id = req.params.id;
  const player = req.body;
  try {
    const existingPlayer =await Player.findByPk(id);
    if (!existingPlayer) {
        return res.status(404).json({ error: "Player not found" });
    }
    await existingPlayer.update(player, { where: { id } });
    res.status(200).json({ message: 'Player updated successfully' });

  } catch (error) {
    res.status(404).json({ 'error in update' : error.message });
  }
};
