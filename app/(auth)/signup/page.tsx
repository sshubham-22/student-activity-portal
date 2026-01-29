'use client'

import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { useRouter } from 'next/navigation'
import { FieldTemplate, SubmitButton } from '../components/rjsf-ui'
import InputWidget from '@/app/components/rjsf/InputWidget'
import PasswordInputWidget from '@/app/components/rjsf/PasswordWidget'
import { RJSFSchema } from '@rjsf/utils'

import { signUp } from '@/app/lib/auth'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()


  const schema: RJSFSchema = {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', title: 'Full name' },
      email: { type: 'string', format: 'email', title: 'Email address' },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 6,
      },
    },
  }

  const uiSchema = {
    name: {
      'ui:widget': 'text'
    },
    email: {
      'ui:widget': 'text'
    },
    password: {
      'ui:widget': 'password',

    },
    'ui:submitButtonOptions': {
      norender: true,
    },
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6 border-2">
      <div className='text-center font-bold text-5xl'>
        Welcome to Student Portal!
      </div>
      <Form
        schema={schema}
        uiSchema={uiSchema}

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
        showErrorList={false}
        onSubmit={async ({ formData }) => {
          try {
            await signUp(
              formData.email,
              formData.password,
              formData.name
            )
            router.push('/dashboard')
          } catch (err) {
            alert(err instanceof Error ? err.message : 'Unknown error')
          }
        }}
      />
        <div className='text-blue-400 text-underline text-center'>
            <Link href="/login" >Existing User? Login</Link>
        </div>
    </div>
  )
}
