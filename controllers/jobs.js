const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    res.send('Get All Jobs')
}

const getJob = async (req, res) => {
    res.send('Get Job')
}

const createJob = async (req, res) => {
     //res.send('Create Job')
     //res.json(req.user)
     // res.send(req.body)
     req.body.createdBy = req.user.userId
     const job = await Job.create(req.body)
     res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    res.send('Update Job')
}

const deleteJob = async (req, res) => {
    res.send('Deelete Job')
}



module.exports = {
    getAllJobs, 
    getJob,
    createJob,
    updateJob,
    deleteJob
}