"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { FormItemComponent } from "@/components/ui/formItems/FormItemComponent";

import loginImage from "../../../public/assests/img/login-image.jpg";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

export function LoginPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Login Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">
            Welcome to Bills Split 🧾
            <br />
            Please login to your account
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormItemComponent
                name="username"
                form={form}
                placeholderValue="Username"
                type="text"
                formLabel="Username/Email"
              />
              <FormItemComponent
                name="password"
                form={form}
                placeholderValue="Password"
                type="password"
                formLabel="Password"
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex flex-1 items-center justify-center ">
        <img
          src={loginImage}
          alt="login illustration"
          className="w-3/1 max-w-md object-contain"
        />
      </div>
    </div>

    </>
  )
}
