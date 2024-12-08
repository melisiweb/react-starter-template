import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof formSchema>;

export const LoginForm = ({
  onLogin,
}: {
  onLogin: (data: FormData) => void;
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    onLogin(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <label className="block">
          Email
          <input
            type="email"
            placeholder="Email"
            {...methods.register('email')}
          />
          {methods.formState.errors.email && (
            <div>{methods.formState.errors.email.message}</div>
          )}
        </label>

        <label className="block">
          Password
          <input
            type="password"
            placeholder="Password"
            {...methods.register('password')}
          />
          {methods.formState.errors.password && (
            <div>{methods.formState.errors.password.message}</div>
          )}
        </label>

        <button type="submit">Login</button>
      </form>
    </FormProvider>
  );
};
