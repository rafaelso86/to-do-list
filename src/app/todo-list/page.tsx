'use client'

import {useEffect, useState} from 'react';
import CreateLists from '@/components/CreateLists';
import TodoListContext from '@/context/TodoListContext';
import TableLists from '@/components/TableLists';
import Button from '@mui/material/Button';
import { Logout } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Skeleton from '@mui/material/Skeleton';

export default function TodoList() {
    const router = useRouter();
    const [todoList, setTodoList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingValidate, setLoadingValidate] = useState<boolean>(true);

    const context = {
        todoList, setTodoList,
        loading, setLoading,
    };

    useEffect(() => {
        const validateUser = async () => {
            // Validação simples
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
            }
            else{
                setTimeout(() => {
                    setLoadingValidate(false);
                }, 1000);
            }
        }
        validateUser();
    })

    const handleLogout = async () => {
        router.push('/');
        localStorage.clear();
    }

    return (
        loadingValidate === false ?
        <TodoListContext.Provider value={context}>
            <div className="content-todo">
                <div className="header">
                    <h1>Todo List</h1>
                    <Button variant="text" onClick={handleLogout} title="Sair">
                        <Logout/>
                    </Button>
                </div>
                <CreateLists />
                { todoList.length !== 0 && <TableLists /> }
            </div>
        </TodoListContext.Provider>
        : 
        <div>
            <Skeleton animation="wave" width={600} height={180} />
        </div>
    )
}
