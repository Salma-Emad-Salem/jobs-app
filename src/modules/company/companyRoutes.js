import { Router } from "express"
import { addCompany, deleteCompany, getApplications, getCompany, getCompanyName, updateCompany } from "./companyController.js"
import { isCompanyHR, isUserOrCompanyHR } from "../../middlewares/authorization.middleware.js"
import { errorHandler } from "../../middlewares/errorHandling.middleware.js"
import { validationMiddleware } from "../../middlewares/validation.middleware.js"
import { CompanyJoi } from "./companySchema.js"



const CompanyRouter =Router()

CompanyRouter.post('/addCompany' ,
    errorHandler( validationMiddleware(CompanyJoi)),
    errorHandler( isCompanyHR ),
    errorHandler( addCompany ))

CompanyRouter.put('/:companyId',
    errorHandler( validationMiddleware(CompanyJoi)),
    errorHandler( isCompanyHR ),
    errorHandler( updateCompany))

CompanyRouter.delete('/:companyId',
    errorHandler( isCompanyHR ),
    errorHandler(deleteCompany))

CompanyRouter.get('/:companyId',
    errorHandler( isCompanyHR ),
    errorHandler(getCompany))

CompanyRouter.get('/search',
    errorHandler(isUserOrCompanyHR),
    errorHandler(getCompanyName))


CompanyRouter.get('/jobs/:jobId/applications',
    errorHandler( isCompanyHR ),
    errorHandler(getApplications))

export default CompanyRouter