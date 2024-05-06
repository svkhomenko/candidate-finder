import z from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { FULL_NAME_LENGTH, PASSWORD_LENGTH, ROLE_ENUM } from '../consts/validation';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
    passwordConfirm: z.string(),
    fullName: z.string().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
    role: z.string().refine((role: string) => ROLE_ENUM.includes(role), {
      message: `role must be ${ROLE_ENUM.join(', ')}`,
    }),
    phoneNumber: z.string().transform((arg, ctx) => {
      const phone = parsePhoneNumberFromString(arg, {
        defaultCountry: 'UA',
        extract: false,
      });

      if (phone && phone.isValid()) {
        return phone.number;
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
      });
      return z.NEVER;
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export { loginSchema, registerSchema };
export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
