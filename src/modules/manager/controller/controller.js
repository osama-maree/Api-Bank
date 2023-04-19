import { branchModel } from "../../../../DB/model/branch_model.js";
import { EmployeeModel } from "../../../../DB/model/employee_model.js";
import bcrypt from "bcryptjs";
export const createAccountForEmp = async (req, res, next) => {
  const { name, email, password, phone, age, gender, branch_id, role } =
    req.body;
  const user = await EmployeeModel.findOne({ email: email }).select("email");
  if (user) {
    next(new Error("exits user", { cause: 400 }));
  } else {
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    const newUser = new EmployeeModel({
      name,
      email,
      password: hash,
      age,
      phone,
      gender,
      branch_id,
      role,
    });
    const saveUser = await newUser.save();
    if (!saveUser) {
      next(new Error("fail register", { cause: 400 }));
    } else {
      res.status(201).json({ message: "success", user: saveUser });
    }
  }
};

export const addBranch = async (req, res, next) => {
  try {
    const { phone, address } = req.body;
    const branch = new branchModel({ phone, address });
    const savedBranch = await branch.save();
    if (savedBranch) {
      res.status(201).json({ message: "success" });
    } else {
      next(new Error("failed added branch", { cause: 400 }));
    }
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const getemployee = async (req, res, next) => {
  try {
    const employee = await EmployeeModel.find({}).populate({
      path: "branch_id",
    });
    res.status(200).json({employee})
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const updateBranchPhone = async(req,res,next)=>{
try{
const {phone}=req.body
const {id}=req.params
const update=await branchModel.findByIdAndUpdate({_id:id},{phone:phone},{new:true})
res.status(200).json({message:'success',update})
}catch(err){
next(new Error(err.message,{cause:500}));
}
}