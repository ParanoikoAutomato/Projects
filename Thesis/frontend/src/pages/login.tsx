import { ChangeEvent, FormEvent, useRef } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const loginCredentials = useRef<Record<string, string>>({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    loginCredentials.current[name] = value;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signIn({
        username: loginCredentials.current.username,
        password: loginCredentials.current.password,
      });
      navigate("/");
    } catch (error) {
      alert("Username or Password are incorrect");
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-300">
      <div className="max-w-md rounded-lg bg-white p-4">
        <form onSubmit={(event) => handleLogin(event)} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl text-black">
              Please log in to continue.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username address"
                    onChange={handleChange}
                    required
                  />
                  <FaRegCircleUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Login
            </button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            ></div>
          </div>
        </form>

        <div className="flex justify-center pt-2">
          <Link className="min-w-[50px]" to={{ pathname: "/register" }}>
            <Button variant="outline" className="border border-black">
              No Account? Register Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
