'use client'

import React, {useContext, useEffect} from 'react';
import { Button, Paper, TextField } from '@mui/material';
import styles from './page.module.css';
import TodoListContext from '@/context/TodoListContext';
import { useForm } from 'react-hook-form';
import PostCreateList from '@/api/PostCreateList';
import GetShowLists from '@/api/GetShowLists';

type Inputs = {
    lists: string
}

export default function CreateLists() {

    const {
        todoList, setTodoList,
        loading, setLoading
    } = useContext(TodoListContext);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            lists: ''
        }
    })

    const userId: number = Number(localStorage.getItem('id'));

    const returnLists = async () => {
        const data: any = await GetShowLists(userId);
        let objTodo = data?.lista?.map((lista: any) => ({
            user_id: lista?.user_id,
            id: lista?.id,
            title: lista?.name,
            status: lista?.status,
        }))

        setTodoList(objTodo);
    }

    useEffect(() => {
        returnLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInput = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value; 
        if(value.length !== 0) clearErrors('lists');
    }

    const onSubmit = async (e: any) => {
        const data = await PostCreateList(userId, watch('lists'), 'novo');
        returnLists();
        setValue('lists', '');
    }

    return (
        <div className={styles.createList}>
            <Paper elevation={3}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
                    <div className={styles.field}>
                        <TextField 
                            id="standard-basic" 
                            label="Adicione uma lista de tarefas" 
                            variant="standard" 
                            fullWidth 
                            {...register("lists", { required: true})} 
                            onChange={e => handleInput(e)}
                            error={!!errors?.lists}
                            helperText={!!errors?.lists ? 'Preencha com um nome para a lista' : ''}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        className={styles.btn} 
                        size="large"
                    >
                        Adicionar
                    </Button>
                </form>
            </Paper>
        </div>
    )
}
