const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    numOfSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: { min: 5 },
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        max(value) {
          if (value > this.numOfSeats) {
            throw new Error("Booked Seats must be <= # of Seats");
          }
        },
      },
    },
    price: { type: DataTypes.FLOAT, defaultValue: 5.0, allowNull: false },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAfter: Date.now() + 86400000 },
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAfter: Date.now() + 86400000 },
    },
    image: { type: DataTypes.STRING, allowNull: false },
  });

  SequelizeSlugify.slugifyModel(Class, {
    source: ["name"],
  });
  return Class;
};
