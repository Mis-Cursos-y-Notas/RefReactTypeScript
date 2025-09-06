import { useForm } from 'react-hook-form';

type FormInputs = {
  email: string;
  password: string;
};

export const FormsPage = () => {
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      email: 'jcesarforero@google.com',
      password: '123456',
    },
  });

  const onSubmit = (myForm: FormInputs) => {
    console.log({ myForm });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Mi Formulario</h3>

      <div className="flex flex-col space-y-2 w-[500px]">
        <input
          type="email"
          placeholder="Ingresa un email valido"
          className="border border-gray-300 p-2 rounded-xl"
          {...register('email', { required: true })}
        />

        <input
          type="password"
          placeholder="password"
          className="border border-gray-300 p-2 rounded-xl"
          {...register('password', { required: true })}
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700">
          Ingresar
        </button>
      </div>
    </form>
  );
};
