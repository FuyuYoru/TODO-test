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
    await signIn(data.login, data.password);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-[500px] max-h-[50%] dark:bg-white p-6 rounded-lg shadow-lg">
        <div className="dark:text-black flex flex-col w-full gap-2">
          <p className="text-lg font-semibold">Авторизация</p>
          <div className="my-4 w-full h-[1px] bg-[#dad8d8]"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <Input placeholder="Логин" type="text" {...register("login")} />
              {errors.login && (
                <p className="text-red-500 text-sm">{errors.login.message}</p>
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#c20840] text-white py-2 rounded-lg hover:bg-[#940740] transition"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
