import { CustomerModel } from "../../../../DB/model/customer_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../../../services/email.js";
import { TypeAccount_Model } from "../../../../DB/model/accounttype_model.js";
import { Account_Model } from "../../../../DB/model/account_model.js";
import { TypeTransaction_Model } from "../../../../DB/model/typetransaction_model.js";
import { Transaction_Model } from "../../../../DB/model/transactions_model.js";
import { pagination } from "../../../services/pagination.js";
import { Loan_Model } from "../../../../DB/model/loan_model.js";
import { LoanType_Model } from "../../../../DB/model/loantype_model.js";
import cloudinary from '../../../services/cloadinary.js'
export const addUser = async (req, res, next) => {
  try {
    if (!req.file) {
      next(new Error("please send pic", { cause: 400 }));
    } else {
      const { name, email, password, phone, age, gender } = req.body;
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "bank",
      });
      const user = await CustomerModel.findOne({ email: email }).select(
        "email"
      );
      if (user) {
        next(new Error("exits user", { cause: 400 }));
      } else {
        const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));

        const newUser = new CustomerModel({
          name,
          email,
          password: hash,
          age,
          phone,
          gender,
          id_pic: secure_url,
        });
        const saveUser = await newUser.save();
        if (!saveUser) {
          next(new Error("fail register", { cause: 400 }));
        } else {
          const token = await jwt.sign(
            { id: saveUser._id },
            process.env.EMAILTOKEN
          );
          const Message = `<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  /**
   * Remove extra space added to tables and cells in Outlook.
   */
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  /**
   * Better fluid images in Internet Explorer.
   */
  img {
    -ms-interpolation-mode: bicubic;
  }
  /**
   * Remove blue links for iOS devices.
   */
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  /**
   * Fix centering issues in Android 4.4.
   */
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  /**
   * Collapse table borders to avoid space between cells.
   */
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="https://blogdesire.com">Paste</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start button -->
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="${req.protocol}://${req.headers.host}${process.env.BASE_URL}auth/confirmEmail/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">verify email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- end button -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="https://blogdesire.com" target="_blank">https://blogdesire.com/xxx-xxx-xxxx</a></p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> Paste</p>
            </td>
          </tr>
          <!-- end copy -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end copy block -->

    <!-- start footer -->
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start permission -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
            </td>
          </tr>
          <!-- end permission -->

          <!-- start unsubscribe -->
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
              <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
            </td>
          </tr>
          <!-- end unsubscribe -->

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
        </html>`;

          await sendEmail(email, "confirmEmail", Message);
          res.status(201).json({ message: "success", user: saveUser });
        }
      }
    }
  } catch (err) {
    next(new Error(err.message, { cause: 400 }));
  }
};
export const createAccount = async (req, res, next) => {
  try {
    const { typeAccount, branch_id, customer_id } = req.body;
    const account = new Account_Model({ typeAccount, branch_id, customer_id });
    const savedAccount = await account.save();
    res.status(201).json({ message: "success", savedAccount });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const addTypeAccount = async (req, res, next) => {
  try {
    const { desc, interestRate } = req.body;

    const TypeAccount = new TypeAccount_Model({
      desc,
      interestRate,
    });
    const savedAccount = await TypeAccount.save();
    res.status(201).json({ message: "success", savedAccount });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const deposit = async (req, res, next) => {
  try {
    const { account_id, amount } = req.body;
    const { type_id } = req.params;
    const updated = await Account_Model.findByIdAndUpdate(
      { _id: account_id },
      { $inc: { balance: amount } },
      { new: true }
    );
    const trans = new Transaction_Model({
      amount,
      type_id,
      account_id,
      employee_id: req.user._id,
    });
    const SavedTrans = await trans.save();
    res.status(200).json({ message: "success", updated, SavedTrans });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const withdraw = async (req, res, next) => {
  try {
    const { account_id, amount } = req.body;
    const { type_id } = req.params;
    const { balance } = await Account_Model.findById({
      _id: account_id,
    }).select("balance -_id");
    // const { balance } = balanc;

    if (balance < amount) {
      res.status(400).json({ message: "mony not match" });
    } else {
      const updated = await Account_Model.findByIdAndUpdate(
        { _id: account_id },
        { $inc: { balance: -1 * amount } },
        { new: true }
      );
      const trans = new Transaction_Model({
        amount,
        type_id,
        account_id,
        employee_id: req.user._id,
      });
      const SavedTrans = await trans.save();
      res.status(200).json({ message: "success", updated, SavedTrans });
    }
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const addtypeTransaction = async (req, res, next) => {
  try {
    const { desc } = req.body;
    const typeTrans = new TypeTransaction_Model({ desc });
    const saved = await typeTrans.save();
    res.status(201).json({ message: "success", saved });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
//here pagination
export const getCustomer = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const { limit, skip } = pagination(page, size);
    const customer = await CustomerModel.find({}).limit(limit).skip(skip);
    res.status(200).json({ message: customer });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const CloseAccount = async (req, res, next) => {
  try {
    const { account_id } = req.body;
    await Account_Model.findByIdAndRemove({ _id: account_id });
    res.status(200).json({ message: "closed" });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const Loan = async (req, res, next) => {
  try {
    const { customer_id, type_id, branch_id, amount } = req.body;
    const loan = new Loan_Model({ customer_id, branch_id, amount, type_id });
    const savedLoan = await loan.save();
    res.status(200).json({ message: "success", savedLoan });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const addtypeLoan = async (req, res, next) => {
  try {
    const { desc } = req.body;
    const loantype = new LoanType_Model({ desc });
    const savedLoan = await loantype.save();
    res.status(200).json({ message: "success", savedLoan });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
