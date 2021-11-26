export const TYPE_USER = {
  admin: "ADMIN",
  user: "USER",
};

// algorithm
export const JWT_ALGORITHM = 'HS256';

// standard login password email
export const REGEX_PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
export const REGEX_EMAIL = '^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$';
