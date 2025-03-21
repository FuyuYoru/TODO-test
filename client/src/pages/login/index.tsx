import { Input } from "@/shared/ui/Input";
import { Eye } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

const formSchema = z.object({
  login: z.string().min(3, "Логин должен содержать минимум 3 символа"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

type FormData = z.infer<typeof formSchema>;

export const LoginPage: React.FC = () => {
  const [passVisible, setPassVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signIn } = useAuth();

  const toggleVisible = () => {
    setPassVisible((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const error = await signIn(data.login, data.password);
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-h-[50%] w-full max-w-[500px] rounded-lg p-6 shadow-lg dark:bg-white">
        <div className="flex w-full flex-col gap-2 dark:text-black">
          <p className="text-lg font-semibold">Авторизация</p>
          <div className="my-4 h-[1px] w-full bg-[#dad8d8]"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <Input placeholder="Логин" type="text" {...register("login")} />
              {errors.login && (
                <p className="text-sm text-red-500">{errors.login.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Пароль"
                type={passVisible ? "text" : "password"}
                {...register("password")}
                icon={
                  <Eye
                    strokeWidth={1}
                    stroke={passVisible ? "#c20840" : "#4e4e50"}
                  />
                }
                iconAction={toggleVisible}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-[#c20840] py-2 text-white transition hover:bg-[#940740]"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
