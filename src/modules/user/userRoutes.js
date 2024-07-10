import { Router } from "express"
import { allRecoveryEmail, deleteUser, forgetPassword, getUser, profileUser, resetPassword, signin, signup, updatePassword, updateUser,  } from "./userController.js"
import { checkEmailOrPhone } from "../../middlewares/checkAuthUser.middleware.js";
import { isUserOrCompanyHR } from "../../middlewares/authorization.middleware.js";
import { UserJoi } from "./user.schema.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { errorHandler } from "../../middlewares/errorHandling.middleware.js";

const userRouter =Router(isUserOrCompanyHR)




userRouter.post('/signUp',
    errorHandler( validationMiddleware(UserJoi)),
    errorHandler( checkEmailOrPhone ),
    errorHandler( signup ))

userRouter.post('/signIn',
    errorHandler(signin), )

userRouter.put('/:userId',
    errorHandler( validationMiddleware(UserJoi)),
    errorHandler( updateUser))

userRouter.delete('/:userId', 
    errorHandler(deleteUser))

userRouter.get('/:userId/profile',
    errorHandler(profileUser))

userRouter.get('/myInfo',
    errorHandler(getUser))

userRouter.put('/myInfo/password',
    errorHandler( validationMiddleware(UserJoi)),
    errorHandler(updatePassword))

userRouter.post('/forget-Password',
    errorHandler( validationMiddleware(UserJoi)),
    errorHandler(forgetPassword) )

userRouter.post('/reset-Password', 
    errorHandler( validationMiddleware(UserJoi)),
    errorHandler(resetPassword) )

userRouter.get('/recoverEmail/:recoverEmail',
    errorHandler( validationMiddleware(UserJoi)),
    errorHandler(allRecoveryEmail) )


export default userRouter;