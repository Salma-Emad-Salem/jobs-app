import { Company } from "../../db/models/comapnyModel";
const isCompanyOwner = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        if (company.owner.toString() !== req.user._id) {
            return res.status(403).json({ message: "Forbidden: Not the company owner" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default isCompanyOwner