import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { getErrorMessage, login } from "@/api"
import type { AxiosError } from "axios"
import { Loader2Icon } from "lucide-react"
import { setTokenCookie, useAuth } from "../context/AuthContext"


type LoginProps = {
    loginClass: string, loginProps: {
        isLoginOpen: boolean;
        setisLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
        setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;

    }
}
export default function Login({ loginClass, loginProps }: LoginProps) {
    const { isLoginOpen, setisLoginOpen, setIsSignUpOpen } = loginProps
    const { fetchUser } = useAuth()

    const FormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(4, {
            message: "Password must be at least 4 characters.",
        }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const { mutate, isPending } = useMutation(
        {
            mutationKey: ["login"],
            mutationFn: login,
            onSuccess: async (data) => {
                setTokenCookie(data.access)
                setisLoginOpen(false)
                toast.success("Logged in")
                await fetchUser()
            },
            onError: (err: AxiosError) => {
                toast.error(getErrorMessage(err));
            }
        }
    )

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutate(data)
    }

    function openSignUp() {
        setisLoginOpen(false)
        setIsSignUpOpen(true)
    }


    return (
        <Dialog open={isLoginOpen} onOpenChange={setisLoginOpen}>
            <DialogTrigger asChild>
                <Button className={loginClass} variant="outline">
                    Login
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>

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
                            Don&apos;t have an account?{" "}
                            <button type="button" className="underline underline-offset-4 text-subMain" onClick={openSignUp}>
                                Sign up
                            </button>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {
                                    isPending && <Loader2Icon className="animate-spin" />
                                }
                                Login</Button>

                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
