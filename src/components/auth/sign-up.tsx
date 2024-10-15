"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signUpSchema } from "@/schemas/auth/signup.schema";
import { destinations } from "@/constants/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const technicalRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
  ];
  const nonTechnicalRoles = ["Project Manager", "HR", "Sales", "Marketing"];
  // UseForm setup with validation schema
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      personalEmail: "",
      workEmail: "",
      domain: undefined,
      password: "",
      role: "",
    },
  });

  // Submit Handler
  const onSubmit = (values: any) => {
    
  };

  return (
    <div className="md:w-8/12 w-10/12 m-auto">
      <Card className="my-2">
        <CardHeader>
          <CardTitle className="text-2xl">Register Now</CardTitle>
          <CardDescription>
            Simplify project planning, enhance team collaboration, and manage
            tasks seamlessly. Register now to access powerful tools!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Row 1: First and Last Name */}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2: Personal and Work Email */}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="personalEmail"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Personal Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workEmail"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Work Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@work.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 3: Destination && Role*/}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Domain</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDomain(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Domain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {destinations.map((item) => (
                            <SelectItem key={item.id} value={item.value}>
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="md:w-5/12 w-full">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Conditionally render roles based on selected domain */}
                          {}
                          {selectedDomain === "tech" &&
                            technicalRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          {selectedDomain === "NonTech" &&
                            nonTechnicalRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 4: Password */}
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-10/12">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <MdOutlineVisibilityOff />
                            ) : (
                              <MdOutlineVisibility />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
