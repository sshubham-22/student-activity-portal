import { RJSFSchema } from "@rjsf/utils"

export const loginSchema:RJSFSchema = {
    
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
export const loginUiSchema = {
    email: {
      'ui:placeholder': 'Enter your email',
    },
    password: {
      'ui:widget': 'password',
      'ui:placeholder': 'Enter your password',
    },
    'ui:submitButtonOptions': {
      submitText: 'Login',
    },
    
  }
    