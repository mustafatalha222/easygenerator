import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import { emailValidation, passwordValidation } from "@/lib/validation";
import { ENDPOINTS } from "@/lib/endpoints";
import { LOCALSTORAGE } from "@/lib/storage";
import ErrorMessage from "@/components/ErrorMessage";
import useApiCall from "@/hooks/useApiCall";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { ROUTES } from "@/lib/routeConstant";

const SignInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
const defaultValues = {
  password: "",
  email: "",
};
type SignInFormValues = z.infer<typeof SignInSchema>;

function SignIn() {
  const { loading, error, apiCall } = useApiCall();
  const navigate = useNavigate();

  const formOptions = {
    resolver: zodResolver(SignInSchema),
    defaultValues,
  };

  const form = useForm<SignInFormValues>({
    ...formOptions,
    mode: "onChange",
  });

  async function onSubmit(data: SignInFormValues) {
    const {
      body: { token },
    } = await apiCall(ENDPOINTS.SIGN_IN, "POST", data);

    if (token) handleSignIn(token);
  }

  const handleSignIn = (token: string) => {
    localStorage.setItem(LOCALSTORAGE.TOKEN, token);
    navigate(ROUTES.WELCOME);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <>
          <header className="flex flex-col items-center">
            <span className="font-semibold text-2xl">Sign-in to continue</span>
          </header>
          <section className="grid gap-3 my-5">
            <FormInput<SignInFormValues>
              label="Email address"
              name="email"
              placeholder="Enter your email"
              control={form.control}
              rightComponent={
                <HiOutlineMail size={20} className="text-dimmed" />
              }
              isSimple={true}
            />

            <PasswordInput<SignInFormValues>
              label="Password"
              name="password"
              placeholder="Enter your Password"
              control={form.control}
              isSimple={true}
            />
          </section>

          <ErrorMessage error={error} />

          <footer className="flex flex-col items-center">
            <Button
              className="w-full"
              type="submit"
              size={"lg"}
              loading={loading}
            >
              Submit
            </Button>

            <p className="text-sm mt-4 mb-3">
              Not a member?
              <span
                className="text-primary font-medium cursor-pointer"
                onClick={() => navigate(ROUTES.SIGN_UP)}
              >
                &nbsp;Sign-Up&nbsp;
              </span>
              now
            </p>
          </footer>
        </>
      </form>
    </Form>
  );
}

export default SignIn;
