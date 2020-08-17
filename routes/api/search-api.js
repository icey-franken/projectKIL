const express = require("express");
const router = express.Router();
const { Project, User } = require("../../db/models");
const { routeHandler } = require("../utils");
//this is all ugly and I have no idea what's going on. Not functioning. don't show.
router.get(
  "/",
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
    
    return res.create(matchingProjects, {query});
  })
);

module.exports = router;
