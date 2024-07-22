const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find( {createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
};

const getJob = async (req, res) => {
  const {user:{userId},params:{id:jobId}} = req

  const job = await Job.findOne({
    _id:jobId,createdBy:userId
  })

  if(!job){
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({job})
};

const createJob = async (req, res) => {
  try {

    req.body.createdBy = req.user.userId; 
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
    console.log('job created');
    console.log(req.user);
 
} catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  res.send('update job');
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
};
