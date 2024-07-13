const job = require('../models/Job')
const {statusCodes} = require('http-status-codes')
const {badRequestError, notFoundError} = require('../errors')
const Job = require('../models/Job')


const getAllJobs = async (req, res) => {
    res.send('get all jobs')
}
const getJob = async (req, res) => {
    res.send('get single job')
}
const createJob = async (req, res) => {
    try {
        req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
    
    } catch (error) {
        console.log(error);
    }
}
const updateJob = async (req, res) => {
    res.send('update job')
}
const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
