import { Button, Input, Link, Form, Divider } from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { icons } from '@renderer/data/ImagesAndIcon'
import { useAuthContext } from '@renderer/pages/Auth'
import { userNameAlreadyTakenApi } from './api'

const checkPasswordMatch = (password: string, confirmPassword: string) => {
  let flag = true
  if (password.length > 0 && confirmPassword.length > 0) {
    if (password !== confirmPassword) flag = false
  }

  return flag
}
const checkUserNameAlreadyTaken = async (userName: string) => {
  const response = await userNameAlreadyTakenApi({ userName })
  if (response.status == 200) return true
  else return false
}

const SignUP = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const authContextData = useAuthContext()
  const [isUserNameTaken, setIsUserNameTaken] = useState(false)

  const password: string = authContextData?.registerForm?.password || ''
  const confirmPassword: string = authContextData?.registerForm?.confirmPassword || ''
  const userName: string = authContextData?.registerForm?.userName || ''

  let isPasswordMatched = useMemo(() => {
    let flag = true
    flag = checkPasswordMatch(password, confirmPassword)
    if (password.length == 0 && confirmPassword.length == 0) flag = true
    return flag
  }, [password, confirmPassword])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!checkPasswordMatch(password, confirmPassword)) return
    if (isUserNameTaken) return
    authContextData?.handleUserAction({ type: 'REGISTER', payload: authContextData.registerForm })
  }
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      if (userName) {
        const isTaken = await checkUserNameAlreadyTaken(userName)
        setIsUserNameTaken(isTaken)
      } else {
        setIsUserNameTaken(false)
      }
    })()
  }, [userName])

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
            onChange={authContextData?.registerHandleChange}
            value={authContextData?.registerForm.email}
          />
          <Input
            isInvalid={isUserNameTaken}
            errorMessage="Username Already Taken"
            isRequired
            label="Username"
            name="userName"
            placeholder="Enter Your Username"
            type="text"
            variant="bordered"
            size="sm"
            onChange={authContextData?.registerHandleChange}
            value={authContextData?.registerForm.userName}
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
            onChange={authContextData?.registerHandleChange}
            value={authContextData?.registerForm.password}
          />
          <Input
            isRequired
            errorMessage="Confirm Password Not Matched"
            isInvalid={!isPasswordMatched}
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
            name="confirmPassword"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
            onChange={authContextData?.registerHandleChange}
            value={
              typeof authContextData?.registerForm.confirmPassword == 'string'
                ? authContextData.registerForm.confirmPassword
                : ''
            }
          />

          <div className="flex w-full items-center justify-between px-1 py-2"></div>
          <Button className="w-full" color="primary" type="submit">
            Sign Up
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
