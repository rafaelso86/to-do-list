'use client'

import React, {useState} from 'react';
import styles from './page.module.css';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from 'next/navigation';
import PostLogin from '@/api/PostLogin';
import PostCreateUser from '@/api/PostCreateUser';

export default function Home() {

  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [typeForm, setTypeForm] = useState(0); // 0 - Criar conta e 1 - Login
  const [errorLogin, setErrorLogin] = useState(false);
  const [erroCadastro, setErroCadastro] = useState(false);
  const [sucessoCadastro, setSucessoCadastro] = useState(false);
  const { register, handleSubmit, watch, setError, clearErrors, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (e: any) => {
    const name = watch('name');
    const email = watch('email');
    const password = watch('password');

    // Fazer Login
    if(typeForm === 0){
      
      const data: any = await PostLogin(email, password);

      if(data?.status === false) {
        setErrorLogin(true);
      }
      else {
        setErrorLogin(false);

        localStorage.setItem('token', data?.user?.token);
        localStorage.setItem('id', data?.user?.usuario_id);
        localStorage.setItem('email', data?.user?.email);
      }

      router.push('/todo-list');
    }

    // Criar conta
    else{
      const data: any = await PostCreateUser(name, email, password);
      if(data?.status === false) setErroCadastro(true);
      else {
        setErroCadastro(false);
        setSucessoCadastro(true);
      }
    }
  }

  const handleTypeForm = (value: number) => {
    let type = value;

    if(type === 1) type = 0
    else type = 1
   
    setValue('name', '');
    clearErrors('name');
    setValue('email', '');
    clearErrors('email');
    setValue('password', '');
    clearErrors('password');
    setTypeForm(type);
    setErroCadastro(false);
    setErrorLogin(false);
    setSucessoCadastro(false);
  }

  return (
    <div className="content">
      <div className='header'>
        <h1>To Do List</h1>
      </div>
      
      <Paper elevation={3}>
        <div className={styles.login}>
          <h2>Faça seu {typeForm === 0 ? 'login' : 'cadastro'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            {
              (!!errorLogin || !!erroCadastro) ?
                <Alert variant="outlined" severity="warning" style={{marginBottom: '20px'}}>
                  {
                    errorLogin === true 
                      ? 'Email ou senha incorretos, tente novamente.' 
                      : erroCadastro === true
                        ? 'Erro ao cadastrar.'
                          : '' 
                  }
                </Alert>

                :
                !!sucessoCadastro &&
                  <Alert variant="outlined" severity="success" style={{marginBottom: '20px'}}>
                    Cadastro realizado com sucesso. Faça seu login.
                  </Alert>
            }

            {
              typeForm === 1 && 
              <TextField 
                error={!!errors?.name}
                fullWidth
                id="outlined-basic" 
                label="Nome" 
                variant="outlined" 
                autoComplete='off'
                {...register("name", { required: true })} 
                helperText={errors?.name?.type === 'required' ? 'Campo obrigatório' : ''}
              />
            }

            <TextField 
              error={!!errors?.email}
              fullWidth
              id="outlined-basic" 
              label="E-mail" 
              variant="outlined" 
              autoComplete='off'
              {...register("email", { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, required: true })} 
              helperText={errors?.email?.type === 'pattern' ? 'Formato de e-mail inválido' : errors?.email?.type === 'required' ? 'Campo obrigatório' : ''}
            />

            <FormControl sx={{ m: 0, width: '100%' }} variant="outlined" error={!!errors?.password}>
              <InputLabel htmlFor={"outlined-adornment-password"}>Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                {...register("password", { required: true, minLength: 8 })} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText id="component-error-text">
                {
                  errors.password ?
                    errors?.password?.type === "minLength" 
                    ? 'A senha deve ter no mínimo 8 caracteres' 
                    : errors?.password?.type === 'required' 
                      ? 'Campo obrigatório' 
                      : ''
                  : ''
                }
              </FormHelperText>
            </FormControl>

            <Button 
              style={{marginTop: '15px'}}
              variant="contained" 
              type="submit" 
              fullWidth
            >
              {typeForm === 0 ? 'Entrar' : 'Cadastrar'}
            </Button>
            <div className="line"></div>
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={e => handleTypeForm(typeForm)}
            >
              Quero {typeForm === 0 ? 'criar uma conta' : 'fazer Login'}
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  )
}
