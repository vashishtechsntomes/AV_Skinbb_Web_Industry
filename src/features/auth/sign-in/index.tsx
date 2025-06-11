import logo from "@/assets/images/logo-white.png";
import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import { AUTH_ROUTES } from "@/routes/auth.routes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";

type FormType = {
  email: string;
  password: string;
  remember: boolean;
};

const SignIn = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const form = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col justify-center gap-8 p-4 sm:p-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <img src={logo} alt="Logo" className="w-32" />

        <h5>Welcome to SkinBB Metaverse</h5>

        <div className="flex flex-col gap-5">
          <FormInput
            control={form.control}
            type="text"
            name="email"
            label="Email"
            placeholder="Enter email"
            inputProps={{ autoFocus: true }}
            rules={{
              required: "Email is required",
            }}
          />

          <FormInput
            control={form.control}
            type={isDarkMode ? "text" : "password"}
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{
              required: "Password is required",
            }}
            inputProps={{
              endIcon: isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="pointer-events-auto !size-5 rotate-180 transform !cursor-pointer transition-transform duration-500 dark:rotate-0"
                  onClick={toggleMode}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="pointer-events-auto !size-5 rotate-0 transform !cursor-pointer transition-transform duration-500 dark:rotate-180"
                  onClick={toggleMode}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ),
            }}
          />

          <div className="flex justify-between gap-2">
            <FormInput
              control={form.control}
              type="checkbox"
              name="remember"
              label="Remember me"
            />

            <NavLink
              to={AUTH_ROUTES.FORGOT_PASSWORD}
              className="flex items-center gap-3"
            >
              Forgot password
            </NavLink>
          </div>
        </div>

        <Button color={"primary"}>Sign In</Button>

        {/* <hr />

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <NavLink to={AUTH_ROUTES.SIGN_UP}>Sign up</NavLink>
        </p> */}
      </form>
    </Form>
  );
};

export default SignIn;
