import { RJSFSchema } from "@rjsf/utils";

export const signupSchema:RJSFSchema = {
    title: 'Create account',
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        title: 'Email',
      },
      password: {
        type: 'string',
        minLength: 6,
        title: 'Password',
      },
    },
  }
  