const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const User = require("../models/User");

////////////////////////////////////////////////////////////////

router.get("/jobs", async (req, res) => {
  try {
    const filters = req.body.filters;

    const jobs = await Job.find(filters ? filters : {}).populate("owner");

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).send("faild to fetch jobs");
  }
});

////////////////////////////////////////////////////////////////

router.post("/create", async (req, res) => {
  // Our login logic starts here
  try {
    const { user } = req.user;

    const { title, price, details, duration, deliverables, category } =
      req.body;

    console.log("Delivs: ", req.body);
    const deliverablesPrice = price / parseInt(deliverables);

    const job = await Job.create({
      title,
      price,
      details,
      duration,
      deliverables,
      category,
      owner: user,
      deliverablesPrice,
    });

    res.status(201).json({ job });
  } catch (err) {
    console.log(err);
    res.status(500).send("faild to create job");
  }
});

////////////////////////////////////////////////////////////////

router.post("/jobs/intersted", async (req, res) => {
  try {
    const { user } = req.user;

    const { jobId } = req.body;

    if (user.role === 0) {
      const job = await Job.findByIdAndUpdate(
        jobId,
        { $push: { interested: user } },
        { lean: true, new: true }
      );

      res.status(200).json(job);
    } else {
      res.status(500).send("user have to be freelancer");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

////////////////////////////////////////////////////////////////

router.post("/assign", async (req, res) => {
  try {
    const { user } = req.user;
    if (user.role === 0) {
      const job = await Job.findOne({ _id: jobId }).populate("owner");

      const { jobId, userId } = req.body;
      if (job.owner._id.toString() === user._id.toString()) {
        job.assigned.push(userId);
        job.interested.filter((intersted) => intersted === userId);
        await job.save();
        const owner = await User.findOneAndUpdate(
          { _id: job.owner._id },
          { $inc: { wallet: price * -1 } }
        );
      } else {
        res.status(500).send("only owner can accept jobs");
        return;
      }
      res.status(200).json({ job });
      return;
    } else {
      res.status(500).send("user isnt a freelancer");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

////////////////////////////////////////////////////////////////

router.post("/addChange", async (req, res) => {
  try {
    const { user } = req.user;
    const { currentJob, title, price, description } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: currentJob },
      {
        $push: {
          changeRequests: {
            title,
            price,
            description,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////////////////////////////////////////////////////

router.post("/acceptChange", async (req, res) => {
  try {
    const { user } = req.user;
    const { currentJob, changeId } = req.body;

    const job = await Job.findOne({ _id: currentJob });
    const isAssigned = job.assigned.find(
      (assigned) => assigned.toString() === user._id
    );

    if (isAssigned) {
      const newJob = await Job.findOneAndUpdate(
        { _id: currentJob, "changeRequests._id": changeId },
        {
          $set: {
            "changeRequests.$.accepted": true,
          },
        },
        { new: true }
      );
      res.status(200).json({ job: newJob });
    } else {
      res.status(500).send("user not assigned to this job");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////////////////////////////////////////////////////

router.post("/clientCheckDelieverable", async (req, res) => {
  try {
    const { user } = req.user;
    const { jobId, delieverableId } = req.body;
    const job = await Job.findOne({ _id: jobId });
    if (user._id.toString() === job.owner.toString()) {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: job._id, "deliverables._id": delieverableId },
        {
          $set: {
            "deliverables.$.clientCheck": true,
          },
        },
        { new: true }
      );

      res.status(200).json({ job: updatedJob });
    } else {
      res.status(500).send("only owner can change job");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error checkDelieverable");
  }
});

////////////////////////////////////////////////////////////////

router.post("/freelancerCheckDelieverable", async (req, res) => {
  try {
    const { user } = req.user;
    const { jobId, delieverableId } = req.body;
    const job = await Job.findOne({ _id: jobId });

    const assignedUser = job.assigned.find(
      (assigned) => assigned.toString() === user._id.toString()
    );
    if (assignedUser) {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: job._id, "deliverables._id": delieverableId },
        {
          $set: {
            "deliverables.$.freelancerCheck": true,
          },
        },
        { new: true }
      );

      res.status(200).json({ job: updatedJob });
    } else {
      res.status(500).send("only owner can change job");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error checkDelieverable");
  }
});

module.exports = router;
