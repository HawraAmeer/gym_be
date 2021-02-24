const { Type, Class } = require("../db/models");

exports.fetchType = async (typeId, next) => {
  try {
    return await Type.findByPk(typeId);
  } catch (error) {
    next(error);
  }
};

exports.fetchTypes = async (req, res, next) => {
  try {
    const types = await Type.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.json(types);
  } catch (error) {
    next(error);
  }
};

exports.createType = async (req, res, next) => {
  try {
    const newType = await Type.create(req.body);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

exports.typeDetail = async (req, res, next) => {
  res.json(req.type);
};

exports.updateType = async (req, res, next) => {
  try {
    const updatedType = await req.type.update(req.body);
    res.status(201).json(updatedType);
  } catch (error) {
    next(error);
  }
};

exports.deleteType = async (req, res, next) => {
  try {
    await req.type.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
