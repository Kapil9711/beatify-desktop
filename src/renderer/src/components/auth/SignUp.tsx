import { Button, Input, Checkbox, Link, Form, Divider } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { icons } from '@renderer/data/ImagesAndIcon'

const SignUP = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('handleSubmit')
  }
  const navigate = useNavigate()
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large  px-8 pb-10 pt-6 shadow-2xl shadow-blue-400 bg-gray-50">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign Up</h1>
          <p className="text-small text-default-500">Welcome to Beatify</p>
        </div>

        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            size="sm"
          />
          <Input
            isRequired
            label="Username"
            name="userName"
            placeholder="Enter Your Username"
            type="text"
            variant="bordered"
            size="sm"
          />
          <Input
            isRequired
            size="sm"
            endContent={
              <button type="button" onClick={toggleVisibility}>
                <Icon
                  className="pointer-events-none text-2xl text-default-400"
                  icon={isVisible ? icons.eyeClosed : icons.eyeBold}
                />
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
          />
          <Input
            isRequired
            size="sm"
            endContent={
              <button type="button" onClick={toggleVisibility}>
                <Icon
                  className="pointer-events-none text-2xl text-default-400"
                  icon={isVisible ? icons.eyeClosed : icons.eyeBold}
                />
              </button>
            }
            label="Confirm Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
          />

          <div className="flex w-full items-center justify-between px-1 py-2"></div>
          <Button className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button startContent={<Icon icon={icons.googleIcon} width={24} />} variant="bordered">
            Continue with Google
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link
            className="cursor-pointer"
            onClick={() => {
              navigate('/auth/sign-in')
            }}
            size="sm"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUP
