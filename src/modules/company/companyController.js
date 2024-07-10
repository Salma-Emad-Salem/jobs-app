import { Company } from "../../../db/models/comapnyModel.js";
import { Application } from "../../../db/models/applicatinModel.js"



const addCompany=async (req, res) => {
    let company = await Company.insertMany(req.body)
    res.status(201).json({message:"comapny is added",company})
}
const updateCompany = async(req,res)=>{
    let company = await Company.findByIdAndUpdate(req.params.id , req.body ,{new :true})
    res.status(200).json({message:"company is update successefuly" , company})
}
const  deleteCompany =async(req , res)=>{
    let company = await Company.findByIdAndDelete(req.params.id , req.body ,{new :true})
    if(!company)return res.status(404).json({message:"company not found"})
    res.status(200).json({message:"company data is deleted successefuly" , company})
}

const  getCompany =async(req , res)=>{
    let company = await Company.findById(req.params.id).populate('jobs')
    if(!company)return res.status(404).json({message:"company not found"})
    res.status(200).json({message:"company data is view successefuly" , company})
}
// Search for Company by Name (Company_HR and User)
const getCompanyName=async(req,res)=>{
    const companyName = req.query.name; // Get name from query
    const companies = await Company.find({ companyName: { $regex: companyName, $options: 'i' } }); // Case-insensitive search
    res.status(200).json({message:"companies data is  successefuly" , companies})
}
// Get Applications for Specific Job (Company Owner)
const getApplications= async (req, res) => {
    const applications = await Application.find({ job: req.params.jobId }).populate('user', 'name email'); // Populate user details
    res.status(200).json({message:"companies data is  successefuly" , applications})
}
export{
    addCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    getCompanyName,
    getApplications
}


