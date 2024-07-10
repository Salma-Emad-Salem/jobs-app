import {Router} from "express"
import { isCompanyHR, isUser,isUserOrCompanyHR } from "../../middlewares/authorization.middleware.js"
import { addJob, applyJob, deleteJob, filterJobs, getJob, getJobByCompanyName, getJobOfCompany, updateJob } from "./jobController.js"
import { JobJoi } from "./job.schema.js"
import { validationMiddleware } from "../../middlewares/validation.middleware.js"
import { ApplicationJoi } from "../application/applicationSchema.js"
import { errorHandler } from "../../middlewares/errorHandling.middleware.js"
import { authenticationMiddleware } from "../../middlewares/authitcation.middleware.js"


const JobRouter =Router()

JobRouter.post('/addJob' ,
    errorHandler(authenticationMiddleware),
    errorHandler(validationMiddleware(JobJoi)),
    errorHandler(isCompanyHR),
    errorHandler(addJob))
 
JobRouter.put('/:JobId',
    
    errorHandler(authenticationMiddleware),
    errorHandler(validationMiddleware(JobJoi)),
    errorHandler(isCompanyHR),
    errorHandler(updateJob))

JobRouter.delete('/:id',
    errorHandler(authenticationMiddleware),
    errorHandler(isCompanyHR),
    errorHandler(deleteJob))

JobRouter.get('/jobs',
    errorHandler(authenticationMiddleware),
    errorHandler(isUserOrCompanyHR),
     errorHandler(getJob))

JobRouter.get('/:companyId/jobs',
    errorHandler(authenticationMiddleware),
    errorHandler(isUserOrCompanyHR),
    errorHandler(getJobOfCompany))

JobRouter.get('/jobs/search',
    errorHandler(authenticationMiddleware),
    errorHandler(isUserOrCompanyHR),
    errorHandler(getJobByCompanyName))


JobRouter.get('/jobs/filter',
    errorHandler(authenticationMiddleware),
    errorHandler(isUserOrCompanyHR),
    errorHandler(filterJobs))

JobRouter.post('/jobs/:jobId/apply',
    errorHandler(authenticationMiddleware),
    validationMiddleware(ApplicationJoi),
    errorHandler(isUser),
    errorHandler(applyJob))




export default JobRouter