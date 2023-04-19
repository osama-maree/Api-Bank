const methods = ["body", "params", "headers", "query"];
const validation = (schema) => {
  return (req, res, next) => {
    let validationArray = [];

    methods.forEach((key) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult?.error?.details) {
          validationArray.push(validationResult.error.details);
        }
      }
    });
    if (validationArray.length > 0) {
      res
        .status(400)
        .json({ message: "validation error", err: validationArray });
    } else {
      next();
    }
  };
};

export default validation;
