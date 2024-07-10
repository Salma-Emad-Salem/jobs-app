import { Job } from "../../../db/models/jobModel.js";
import { Company } from "../../../db/models/comapnyModel.js";
import { Application } from "../../../db/models/applicatinModel.js"



const addJob=async (req, res) => {
    let job = await Job.insertMany(req.body)
    res.status(201).json({message:"job is added",job})
}
const updateJob = async(req,res)=>{
    let job = await Job.findByIdAndUpdate(req.params.id , req.body ,{new :true})
    res.status(200).json({message:"Job is update successefuly" , job})
}
const  deleteJob =async(req , res)=>{
    let job = await Job.findByIdAndDelete(req.params.id , req.body ,{new :true})
    if(!job)return res.status(404).json({message:"Job not found"})
    res.status(200).json({message:"Job data is deleted successefuly" , job})
}
// Get all Jobs with company info (for User and Company_HR)
const  getJob =async(req , res)=>{
    const jobs = await Job.find().populate('company', 'companyName');
    res.json({message:"Job data is viewed successefuly" , jobs});
}
// Get jobs for a specific company (for User and Company_HR)
const  getJobOfCompany =async(req , res)=>{
    const jobs = await Job.find({ company: req.params.companyId });
    res.json({message:"Job Of Company is viewed successefuly" , jobs});
}
// Get jobs for a company by name (using query parameter)
const getJobByCompanyName =async(req , res)=>{
    const companyName = req.query.companyName; // Get company name from query
    const company = await Company.findOne({ companyName }); // Find company by name
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
  
    const jobs = await Job.find({ company: company._id });
    res.json(jobs);
}
// Filter jobs (for User and Company_HR)
const filterJobs =async (req, res) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const filter = {};
    if (workingTime) filter.workingTime = workingTime;
    if (jobLocation) filter.jobLocation = jobLocation;
    if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
    if (jobTitle) filter.jobTitle = jobTitle;
    if (technicalSkills) filter.technicalSkills = { $in: technicalSkills.split(',') }; // Split skills into array
  
    const jobs = await Job.find(filter).populate('company', 'companyName');
    res.json(jobs);
}
//application 
const applyJob = async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const userId = req.user._id; // Get user ID from authenticated request
  
      // Check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Check if the user has already applied for this job
      const existingApplication = await Application.findOne({ user: userId, job: jobId });
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }
  
      // Create a new application document
      const newApplication = new Application({
        user: userId,
        job: jobId,
        userTechSkills,
        userSoftSkills,
        userResume

      });
  
      await newApplication.save();
      res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting application' });
    }
  }
export{
    addJob,
    updateJob,
    deleteJob,
    getJob,
    getJobOfCompany,
    getJobByCompanyName,
    filterJobs,
    applyJob
}