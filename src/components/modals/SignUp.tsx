import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api";
import type { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";

type SignUpProps = {
  loginClass: string;
  signUpProps: {
    isSignUpOpen: boolean;
    setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setisLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};
export default function SignUp({ loginClass, signUpProps }: SignUpProps) {
  const { isSignUpOpen, setIsSignUpOpen, setisLoginOpen } = signUpProps;

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Sign up successful");
      openLogin();
    },
    onError: (err: AxiosError) => {
      const errorData = err.response?.data as Record<string, any> | undefined;

      if (errorData) {
        const emailError = errorData.email;
        const usernameError = errorData.username;
        const passwordError = errorData.password;

        if (emailError) {
          form.setError(
            "email",
            {
              message: emailError,
            },
            {
              shouldFocus: true,
            }
          );
        }

        if (usernameError) {
          form.setError(
            "username",
            {
              message: usernameError,
            },
            {
              shouldFocus: !emailError, // Only focus if email didn't already
            }
          );
        }

        if (passwordError) {
          form.setError(
            "password",
            {
              message: passwordError,
            },
            {
              shouldFocus: !emailError && !usernameError, // Focus only if others didn't
            }
          );
        }
      }
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }
  function openLogin() {
    setIsSignUpOpen(false);
    setisLoginOpen(true);
  }

  return (
    <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
      <DialogTrigger asChild>
        <Button className={loginClass} variant="outline">
          Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
        </DialogHeader>
        <DialogDescription>Sign up</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="underline underline-offset-4 text-subMain"
                onClick={openLogin}
              >
                Login
              </button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isPending && <Loader2Icon className="animate-spin" />}
                Sign Up
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
