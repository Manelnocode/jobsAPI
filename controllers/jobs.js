const job = require('../models/Job')
const {statusCodes} = require('http-status-codes')
const {badRequestError, notFoundError} = require('../errors')




const getAllJobs = async (req, res) => {
    res.send('get all jobs')
}
const getJob = async (req, res) => {
    res.send('get single job')
}
const createJob = async (req, res) => {
    res.json(req.body)
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
