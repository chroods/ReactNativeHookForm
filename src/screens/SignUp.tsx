import { VStack,Heading, Center} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import {yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { Input } from '../components/input';
import { Button } from '../components/Button';

type FormDataProps ={
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail invalido'),
  password: yup.string().required('Informe a senha')
  .min(6, 'A senha deve estar entre 6 a 56 caracteres')
  .max(56, 'A senha deve estar entre 6 a 56 caracteres'),
  password_confirm: yup
  .string()
  .required('Informe a confirmação de senha')
  .oneOf([yup.ref('password')], 'A confirmação de senha não é igual')
})

export function SignUp() {
  const { control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack bgColor="gray.300" flex={1} px={10}>
      <Center>
        <Heading my={24}>
            Crie sua conta
        </Heading>

        <Controller
          control={control}
          name="name"
          render={({field: {onChange, }}) =>(
            <Input 
              placeholder='Nome' 
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({field: {onChange, }}) =>(
            <Input 
              placeholder='E-mail' 
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />


        <Controller
          control={control}
          name="password"
          render={({field: {onChange, }}) =>(
            <Input 
              placeholder='Senha' 
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.password?.message}
             />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          render={({field: {onChange, }}) =>(
            <Input 
              placeholder='Confirme a senha' 
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.password_confirm?.message}
             />
          )}
        />
        
        <Button title="Cadastrar" onPress={handleSubmit(handleSignUp)} />
      </Center>
    </VStack>
  );
}
