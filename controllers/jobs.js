const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    //res.send('Get All Jobs')
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {
     //res.send('Get Single Job')
     const {user: {userId}, params: {id: jobId}} = req
     const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
     })
    if (!job) {
        throw new NotFoundError(`Not job with id ${jobId} found.`)
    }
    res.status(StatusCodes.OK).json({job})
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
    //res.send('Update Job')
    const {
        body: {company, position},
        user: {userId},
        params: {id: jobId},
      } = req
      if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty.')
      }
      const job = await Job.findByIdAndUpdate(
        {_id: jobId, createdBy: userId},
        req.body,
        {new: true, runValidators: true}
      )
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId} found.`)
      }
      res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    //res.send('Delete Job')
    const {
        user: {userId},
        params: {id: jobId},
      } = req
      const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId,
      })
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId} found.`)
      }
      res.status(StatusCodes.OK).json({msg: "The entry was deleted."})
}



module.exports = {
    getAllJobs, 
    getJob,
    createJob,
    updateJob,
    deleteJob
}