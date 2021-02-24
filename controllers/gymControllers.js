const { Class, Gym } = require("../db/models");

exports.fetchGym = async (gymId, next) => {
  try {
    return await Gym.findByPk(gymId);
  } catch (error) {
    next(error);
  }
};

exports.fetchGyms = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.json(gyms);
  } catch (error) {
    next(error);
  }
};

exports.createGym = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (error) {
    next(error);
  }
};

exports.gymDetail = async (req, res, next) => {
  res.json(req.gym);
};

exports.updateGym = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedGym = await req.gym.update(req.body);
    res.status(201).json(updatedGym);
  } catch (error) {
    next(error);
  }
};

exports.deleteGym = async (req, res, next) => {
  try {
    await req.gym.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    req.body.gymId = req.gym.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};
