import Joi from "joi";
export const signupValidation = {
  body: Joi.object().required().keys({
      age: Joi.string().required(),
      name: Joi.string().min(3).max(15).required().messages({
        "any.required": "plz send your name",
        "string.empty": "name is required",
      }),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
      phone: Joi.string().required(),
      gender: Joi.string().required(),
    }),
};
export const addTypeAccount = {
  body: Joi.object().required().keys({
    desc: Joi.string().required(),
    interestRate: Joi.string().required(),
  }),
};
//typeAccount, branch_id, customer_id
export const createAccountV = {
  body: Joi.object()
    .required()
    .keys({
      branch_id: Joi.string().min(24).max(24).required(),
      customer_id: Joi.string().min(24).max(24).required(),
      typeAccount: Joi.string().min(24).max(24).required(),
    }),
};
//account_id, amount
export const DepositAndWithdraw = {
  body: Joi.object()
    .required()
    .keys({
      account_id: Joi.string().min(24).max(24).required(),
      amount: Joi.string().required(),
    }),
  params: Joi.object()
    .required()
    .keys({
      type_id: Joi.string().min(24).max(24).required(),
    }),
};
