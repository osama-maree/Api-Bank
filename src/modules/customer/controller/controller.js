import { Account_Model } from "../../../../DB/model/account_model.js";

export const viewAccount = async (req, res, next) => {
  try {
    const { customer_id } = req.user._id;
    const account = await Account_Model.findOne({ customer_id });
    res.status(200).json({ message: account });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const convertMoney = async (req, res, next) => {
  try {
    const { account_id, amount, to } = req.body;
    const { balance } = await Account_Model.findOne({ _id: account_id }).select(
      "balance"
    );
    if (balance < amount) {
      res.status(400).json({ message: "balance not match" });
    } else {
      await Account_Model.findByIdAndUpdate(
        { _id: account_id },
        { $inc: { balance: -1 * amount } }
      );
      const updatedAccount = await Account_Model.findByIdAndUpdate(
        { _id: to },
        { $inc: { balance: amount } },
        { new: true }
      );
      res.status(200).json({ message: "success", updatedAccount });
    }
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

