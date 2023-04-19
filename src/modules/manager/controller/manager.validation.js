//   phone,  gender, branch_id, role


import Joi from "joi";
export const signupValidation = {
  body: Joi.object()
    .required()
    .keys({
      age: Joi.number().required(),
      name: Joi.string().min(3).max(15).required().messages({
        "any.required": "plz send your name",
        "string.empty": "name is required",
      }),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
      phone: Joi.string().required(),
      gender: Joi.string().required(),
      role: Joi.string(),
      branch_id:Joi.string().min(24).max(24).required()
    }),
};
