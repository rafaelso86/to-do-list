'use client'

import React, {createContext} from 'react';

interface MyContext {
    todoList: any[],
    setTodoList: (newValue: any[]) => void,

    loading: boolean,
    setLoading: (newValue: boolean) => void,
}

const TodoListContext = createContext<MyContext>({
    todoList: [],
    setTodoList: () => {},

    loading: false,
    setLoading: () => {},
}) 

export default TodoListContext