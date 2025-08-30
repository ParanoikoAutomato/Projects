import { Form } from "@/components/ui/form";

import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormTextInput from "../components/form-inputs/text-input";
import { Button } from "@/components/ui/button";
import { useRegisterUserMutation } from "@/features/users/users.mutations";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth";

export type RegisterUser = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const ref = useRef<HTMLFormElement | null>(null);

  const { mutateAsync } = useRegisterUserMutation();
  const form = useForm<RegisterUser>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<RegisterUser> = async (user) => {
    try {
      await mutateAsync({ user });
      await signIn({ username: user.username, password: user.password });
      navigate("/");
    } catch (error) {
      if (error.response?.data?.error === "Username already exists") {
        form.setError("username", {
          type: "manual",
          message: "Username already exists. Please choose another one.",
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-300 ">
      <div className="rounded-lg bg-white p-4">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <div className="flex justify-center text-lg">Register</div>
          <Form {...form}>
            <form
              ref={ref}
              className="space-y-4 overflow-y-auto p-3 gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormTextInput
                name={"firstName"}
                label={"First Name"}
                placeholder={"First Name"}
                validation={{
                  min: 5,
                  required: "First Name is required",
                }}
              />
              <FormTextInput
                name={"lastName"}
                label={"Last Name"}
                placeholder={"Last Name"}
                validation={{
                  min: 5,
                  required: "Last Name is required",
                }}
              />
              <FormTextInput
                name={"username"}
                label={"Username"}
                placeholder={"Username"}
                validation={{
                  min: 5,
                  required: "Username is required",
                }}
              />
              <FormTextInput
                name={"password"}
                label={"Password"}
                placeholder={"Password"}
                isPassword
                validation={{
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters long",
                  },
                  required: "Field is required",
                }}
              />
              <div className="flex justify-center">
                <Button type="submit">Register</Button>
              </div>
            </form>
          </Form>
          <div className="flex justify-center pt-2">
            <Link className="min-w-[50px]" to={{ pathname: "/login" }}>
              <Button variant="outline" className="border border-black">
                Have Account? Login Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
