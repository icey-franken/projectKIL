const express = require("express");
const router = express.Router();
const { Project, User } = require("../../db/models");
const { routeHandler } = require("../utils");

router.get(
  "/search/results/:string",
  routeHandler(async (req, res) => {
    const query = req.params.string;
    const matchingProjects = await Project.findAll({
      include: [{ model: User }],
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
          intro: {
            [Op.iLike]: `%${query}%`,
          },
          supplies: {
            [Op.iLike]: `%${query}%`,
          },
          destructions: {
            [Op.iLike]: `%${query}%`,
          },
        },
      },
    });
    
    return res.json(matchingProjects);
  })
);

module.exports = router;
