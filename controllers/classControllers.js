const { Class, Gym, Type } = require("../db/models");

exports.fetchClass = async (classId, next) => {
  try {
    return await Class.findByPk(classId);
  } catch (error) {
    next(error);
  }
};

exports.fetchClasses = async (req, res, next) => {
  try {
    const classes = await Class.findAll({
      attributes: { exclude: ["gymId", "typeId", "createdAt", "updatedAt"] },
      include: [
        {
          model: Gym,
          as: "gym",
          attributes: ["id", "name", "slug", "image"],
        },
        {
          model: Type,
          as: "type",
          attributes: ["id", "name"],
        },
      ],
    });
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

exports.classDetail = async (req, res, next) => {
  res.json(req.class);
};

exports.updateClass = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const updatedClass = await req.class.update(req.body);
    res.status(201).json(updatedClass);
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    await req.class.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
