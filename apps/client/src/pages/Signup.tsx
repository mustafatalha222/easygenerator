import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import { emailValidation, passwordValidation } from "@/lib/validation";
import { ENDPOINTS } from "@/lib/endpoints";
import ErrorMessage from "@/components/ErrorMessage";
import useApiCall from "@/hooks/useApiCall";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { ROUTES } from "@/lib/routeConstant";
import { HiMiniInformationCircle } from "react-icons/hi2";

const signUpFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  name: z.string().min(3).max(30),
});

const defaultSignUp = {
  password: "",
  email: "",
  name: "",
};
type SignUpFormValues = z.infer<typeof signUpFormSchema>;

function SignUp() {
  const { loading, error, apiCall } = useApiCall();
  const navigate = useNavigate();

  const formOptions = {
    resolver: zodResolver(signUpFormSchema),
    defaultValues: defaultSignUp,
  };

  const form = useForm<SignUpFormValues>({
    ...formOptions,
    mode: "onChange",
  });

  async function onSubmit(data: SignUpFormValues) {
    const {
      body: { token },
    } = await apiCall(ENDPOINTS.SIGN_UP, "POST", data);

    if (token) return navigate(ROUTES.WELCOME);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <>
          <header className="flex flex-col items-center">
            <span className="font-semibold text-2xl">Sign-up to continue</span>
          </header>
          <section className="grid gap-3 my-5">
            <FormInput<SignUpFormValues>
              label="Name"
              name="name"
              placeholder="Enter your name"
              control={form.control}
              rightComponent={
                <HiMiniInformationCircle size={20} className="text-dimmed" />
              }
              isSimple={true}
            />

            <FormInput<SignUpFormValues>
              label="Email address"
              name="email"
              placeholder="Enter your email"
              control={form.control}
              rightComponent={
                <HiOutlineMail size={20} className="text-dimmed" />
              }
              isSimple={true}
            />

            <PasswordInput<SignUpFormValues>
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
              Register to continue
            </Button>

            <p className="text-sm mt-4 mb-3">
              Already created account?
              <span
                className="text-primary font-medium cursor-pointer"
                onClick={() => navigate(ROUTES.SIGN_IN)}
              >
                &nbsp;Sign-In&nbsp;
              </span>
              now
            </p>
          </footer>
        </>
      </form>
    </Form>
  );
}

export default SignUp;
