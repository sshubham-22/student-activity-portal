'use client'

import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { useRouter } from 'next/navigation'
import { FieldTemplate, SubmitButton } from '../components/rjsf-ui'
import { RJSFSchema } from '@rjsf/utils'

import InputWidget from '@/app/components/rjsf/InputWidget'
import PasswordInputWidget from '@/app/components/rjsf/PasswordWidget'
import { signIn } from '@/app/lib/auth'
import Link from 'next/link'


export default function LoginPage() {
  const router = useRouter()

  const schema:RJSFSchema ={
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              title: 'Email address',
            },
            password: {
              type: 'string',
              title: 'Password',
              minLength: 6,
            },
          },
        
  }
  const uiSchema={
    email: {
      'ui:widget':'text'
    },
    password: {
      'ui:widget': 'password',
      
    },
    'ui:submitButtonOptions': {
      norender: true,
    },
  }

  return (
    <main className='min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-neutral-100 px-4'>
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6 gap-5 border-2 ">
      <div className='text-center font-bold text-5xl'>
        Welcome to Student Portal!
      </div>
      <Form
        schema={schema}
        uiSchema={
          uiSchema
        }
        
        validator={validator}
        templates={{
          FieldTemplate,
          ButtonTemplates: {
            SubmitButton,
          },
        }}
        widgets={{
          TextWidget: InputWidget,
          PasswordWidget: PasswordInputWidget,
        }}
        onSubmit={async ({ formData }) => {
          try {
            await signIn(formData.email, formData.password);
            router.replace('/dashboard')
            router.refresh()
          } catch (err) {
            if (err instanceof Error) {
              alert(err.message);
            } else {
              alert('An unknown error occurred.');
            }
          }
        }}
        showErrorList={false}
      />
      <div className='text-blue-400 text-underline text-center'>
        <Link href="/signup" >New User? SignUp</Link>
      </div>
    
    </div>
    </main>
  )
}
