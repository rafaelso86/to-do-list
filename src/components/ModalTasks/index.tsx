'use client'

import React, {useContext, useState, useEffect} from 'react'
import TodoListContext from '@/context/TodoListContext';
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, GridRowSelectionModel, GridTreeNode, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { AddCircle } from '@mui/icons-material';
import styles from './page.module.css'
import GetShowTasks from '@/api/GetShowTasks';
import PostCreateTask from '@/api/PostCreateTask';
import PostUpdateStatusList from '@/api/PostUpdateStatusList';
import PostUpdateCheckTask from '@/api/PostUpdateCheckTask';
import { DialogContentText } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IProps {
    open: boolean,
    selectedList: {
        title: string,
        id: number,
        status: string,
        usuario: string
    },
    setSelectedList: any,
    handleOpen: (e: any, index: number) => void,
    handleClose: () => void,
    returnLists: () => void,
}

export default function ModalTasks({returnLists, open, selectedList, setSelectedList, handleOpen, handleClose}: IProps) {

    const {
        todoList, setTodoList,
        loading, setLoading
    } = useContext(TodoListContext)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<any>([]);
    const userId = Number(localStorage.getItem('id'));
    const listId = selectedList.id;
    let objTask: any;

    const [isCheck, setIsCheck] = useState<any>([]);

    const returnTasks = async () => {
        const data: any = await GetShowTasks(userId, listId);
        objTask = data?.tasks?.map((task: any) => ({
            id: task?.id,
            title: task?.name,
            check: task?.check, // 0 uncheck - 1 check
        }))

        const check: any = data?.tasks?.filter((task: any) => task.check === 1 )
        const checked = check.map((check: any) => check.id);
        setIsCheck(checked);
        setTasks(objTask);
    }
    useEffect(() => {
        returnTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70,
        },
        { field: 'tasks', headerName: 'Tarefas', width: 130 },
    ];

    const rows = tasks?.map((task: any, index: number) => ({
            id: task.id, 
            tasks: task.title,
        })
    )

    const handleAddTask = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskName(e.target.value)
    }

    const handleSaveTask = async () => {
        if(taskName !== ''){
            const data = await PostCreateTask(userId, listId, taskName, 0);
            await returnTasks();
            setTaskName('');
        }
    }

    const handleCheck = async (params: GridCellParams, e: MuiEvent, details: GridCallbackDetails) => {
        const checkId: any = params?.id;
        const checkValue = params?.value;
        let checked: number;

        if(checkValue === false){
            checked = 1;
        }
        else{
            checked = 0;
        }

        await PostUpdateCheckTask(userId, checkId, checked);
        returnTasks();
        
        // Mudar o status da List
        const arrChecked = await tasks.filter((task: any) => task.check === 0);
        let statusList: string;
        if(arrChecked.length > 1){
            statusList = 'fazendo';
        }else{
            statusList = 'concluído';
        }

        const dataUpdate = await PostUpdateStatusList(userId, listId, statusList)
        if(dataUpdate){
            returnLists();
        }
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="responsive-dialog-title">
                    {selectedList.title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <DialogContentText>
                        <div className={styles.addTask}>
                            <TextField 
                                id="standard-basic" 
                                label="Adicionar uma terefa" 
                                variant="standard" 
                                fullWidth 
                                onChange={e => handleAddTask(e)} 
                                value={taskName}
                            />
                            <IconButton aria-label="delete" size="large" onClick={handleSaveTask}>
                                <AddCircle fontSize="inherit" />
                            </IconButton>
                        </div>
                        {
                            (tasks !== 0 && loading === false) &&
                            <div className="table">
                                <div style={{ height: 400, width: '100%', maxWidth: '548px' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection
                                        onCellClick={handleCheck}
                                        rowSelectionModel={isCheck}
                                    />
                                </div>
                            </div>
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}
