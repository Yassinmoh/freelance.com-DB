const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Project = require("../models/Project");
const router = require("express").Router();

//create new project
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { projectName, budget, description, state, category } = req.body;
  const newproject = await new Project({
    projectName,
    budget,
    description,
    state,
    user_id: req.user.id,
    category,
  });
  try {
    const saveproject = await newproject.save();
    res.status(200).json(saveproject);
  } catch (error) {
    res.status(401).json(error);
  }
});

//update project

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },

      { new: true }
    );
    const saveproject = await updatedProject.save();
    res.status(200).json(saveproject);
  } catch (err) {
    res.status(500).json(err);
  }
});
//all projects
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allproject = await Project.find();
    res.status(200).json(allproject);
  } catch (error) {
    res.status(401).json(error);
  }
});

//one project

router.get("/oneproject/:id", async (req, res) => {
  try {
    const oneproject = await Project.findById(req.params.id);
    res.status(200).json(oneproject);
  } catch (error) {
    res.status(401).json(error);
  }
});

//delete project
// router.delete("/deleteproject/:id", async (req, res) => {
//   try {
//     const oneproject = await Project.findByIdAndDelete(req.params.id);
//     res.status(200).json("Project Is Deleted");
//   } catch (error) {
//     res.status(401).json(error);
//   }
// });





// delete project from Front

router.delete("/deleteproject/:id", async (req, res) => {
  try {
    const oneproject = await Project.findByIdAndUpdate(req.params.id,{ deleted: true });
    res.status(200).json("Project Is Deleted");
  } catch (error) {
    res.status(401).json(error);
  }
});


//Get All Trashed Progects: 

router.get('/trash', async (req, res) => {

  try {
    const Trashproject= await Project.find({deleted:true });
    res.status(200).json(Trashproject)
  } catch (error) {
    res.status(500).json(error)
  }
})
//restore Project from trash
router.put("/restore/:id", async (req, res) => {
  try {
    const oneproject = await Project.findByIdAndUpdate(req.params.id,{ deleted: false });
    res.status(200).json("Project Is Restore");
  } catch (error) {
    res.status(401).json(error);
  }
});


// get pending projects from back:

router.get("/pending", async (req, res) => {
  const noOfPendingProjects = await Project.find({ state: "pending" }).countDocuments();

  res.json({ message: "No All pending Project", noOfPendingProjects });
})
// get completed projects:

router.get("/completed", async (req, res) => {
  const noOfcompletedProjects = await Project.find({ state: "completed" }).countDocuments();

  res.json({ message: "No All completed Project", noOfcompletedProjects });
})

module.exports = router;
