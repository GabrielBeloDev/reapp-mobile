import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { Button, Input } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório.' })
    .email('Email inválido.'),
  password: z.string({ required_error: 'A senha é obrigatória.' }),
});

type signInFormData = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  const auth = useAuth();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await auth.signIn();
    if (res.user !== undefined) {
      router.replace('/');
    }
  };

  return (
    <View className="gap-3 px-4">
      <View className="flex-row justify-center gap-2">
        <View>
          <Button customStyles="w-14 justify-center bg-color_third_light">
            <Ionicons
              name="logo-facebook"
              size={24}
              color={colors.text_neutral}
            />
          </Button>
        </View>

        <View>
          <Button customStyles="w-14 justify-center bg-color_third_light">
            <Ionicons
              name="logo-google"
              size={24}
              color={colors.text_neutral}
            />
          </Button>
        </View>
      </View>

      <Text className="text-center font-reapp_regular text-xs">
        Ou cadastre-se com seu email
      </Text>

      <View>
        <Text className="font-reapp_regular text-base">Email</Text>
        <Input
          placeholder="Digite seu email"
          inputMode="email"
          onChangeText={(text) =>
            setValue('email', text, { shouldValidate: true })
          }
          value={watch('email')}
          {...register('email')}
        />
        {errors.email && (
          <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
            {errors.email.message}
          </Text>
        )}
      </View>

      <View>
        <Text className="font-reapp_regular text-base">Senha</Text>
        <Input
          placeholder="Digite sua senha"
          secureTextEntry
          {...register('password')}
          onChangeText={(text) =>
            setValue('password', text, { shouldValidate: true })
          }
          value={watch('password')}
        />
        {errors.password && (
          <Text className="my-1 font-reapp_regular text-xs text-color_redsh">
            {errors.password.message}
          </Text>
        )}
      </View>

      <Text
        className="text-base text-text_primary underline underline-offset-1"
        onPress={() => router.push('/forgot-password')}
      >
        Esqueci minha senha
      </Text>

      <View>
        <Button
          customStyles="w-full justify-center bg-color_primary"
          textColor="text-text_light"
          onPress={handleSubmit(onSubmit)}
        >
          Entrar
        </Button>
      </View>

      <Text className="text-center font-reapp_regular text-base">
        Não possui conta?{' '}
        <Link
          href="/profile-selector"
          push
          className="text-base text-text_primary underline underline-offset-1"
        >
          Cadastre-se
        </Link>
      </Text>
    </View>
  );
}
