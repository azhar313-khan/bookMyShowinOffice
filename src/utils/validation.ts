import Joi from "joi";

// Define the types for input validation
interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  newPassword: string;
}

// Common password validation schema
const passwordSchema = Joi.string()
  .min(6)
  .regex(/[A-Z]/, "uppercase letter")
  .regex(/[a-z]/, "lowercase letter")
  .regex(/[0-9]/, "digit")
  .regex(/[\W_]/, "special character")
  .messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "string.pattern.name": "Password must contain at least one {#name}",
  });

export const signUpValidator = (data: SignUpData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(6).required().email(),
    password: passwordSchema,
  });

  return schema.validate(data);
};

export const loginValidator = (data: LoginData) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: passwordSchema,
  });

  return schema.validate(data);
};

export const changePasswordValidator = (data: ChangePasswordData) => {
  const schema = Joi.object({
    newPassword: passwordSchema,
  });

  return schema.validate(data);
};
