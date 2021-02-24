const { Gym } = require("../db/models");

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
      //   include: {
      //     model: Donut,
      //     as: "donuts",
      //     attributes: ["id"],
      //   },
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
    // req.body.userId = req.user.id;
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

// exports.createDonut = async (req, res, next) => {
//   try {
//     const foundGym = await Gym.findByPk(req.Gym.id);
//     if (!foundGym) {
//       const err = new Error("Create a Gym first!");
//       err.status = 401;
//       next(err);
//     }
//     if (foundGym.userId !== req.user.id) {
//       const err = new Error("You are not the owner, you can't add products.");
//       err.status = 401;
//       next(err);
//     }

//     req.body.gymId = req.Gym.id;
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newDonut = await Donut.create(req.body);
//     res.status(201).json(newDonut);
//   } catch (error) {
//     next(error);
//   }
// };
