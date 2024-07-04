const { z } = require('zod');

const userSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobilenumber: z.string().min(10,'Must be of length 10'),
});

module.exports = { userSchema };
