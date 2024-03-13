'use client'

import React, {useState, useContext} from 'react';
import { IconButton, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './page.module.css';
import TodoListContext from '@/context/TodoListContext';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import ModalTasks from '../ModalTasks';
// import PostDeleteList from '@/api/PostDeleteList';
import GetShowLists from '@/api/GetShowLists';
import DeleteDialog from '../DeleteDialog';

interface Column {
    id: 'title' | 'status' | 'action';
    label: string;
    minWidth?: number;
    align?: 'left' | 'right';
    format?: (value: number) => string;
}

interface Data {
    title: string;
    status: any;
    action: any;
}

export default function TableLists() {

    const {
        todoList, setTodoList,
        loading, setLoading,
    } = useContext(TodoListContext);

    const columns: Column[] = [
        { id: 'title', label: 'Lista', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 100 },
        {
          id: 'action',
          label: 'Ações',
          minWidth: 100,
        },
    ];
      
    function createData(
        title: string,
        status: any,
        action: any,
        ): Data {
        return { title, status, action };
    }
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState<any>([]);
    const userId = localStorage.getItem('id');

    const returnLists = async () => {
        const data: any = await GetShowLists(Number(userId));

        let objTodo = data.lista.map((lista: any) => ({
            user_id: lista?.user_id,
            id: lista?.id,
            title: lista?.name,
            status: lista?.status,
        }))

        setTodoList(objTodo);
    }

    let rows = todoList.map((list: any, index: number) => 
        createData(list.title, 
                    <Chip className="chip" label={list.status} size="small" color="primary" variant="outlined" />, 
                    <>
                        <IconButton aria-label="show" onClick={e => handleOpen(e, index)}><Visibility /></IconButton>
                        <IconButton aria-label="delete" onClick={e => handleDelete(e, index, list.id)}><DeleteIcon /></IconButton> 
                    </>),    
    );

    const handleOpen = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        setSelectedList(todoList[index]);
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number, id: number) => {
        setSelectedList(todoList[index]);
        setOpenAlert(true);
    }

      
    return (
        <div className={styles.tableLists}>
                <Paper elevation={3} className={styles.content}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                            {
                                // loading === false
                                // ?
                                <TableBody>
                                    {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.status}>
                                            {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                                </TableCell>
                                            );
                                            })}
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                                // : 
                                // ''
                            }
                        
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper> 
            
                
                {
                    open === true &&
                    <ModalTasks returnLists={returnLists} open={open} selectedList={selectedList} setSelectedList={setSelectedList} handleOpen={handleOpen} handleClose={handleClose} />
                }

                {
                    openAlert === true &&
                    <DeleteDialog returnLists={returnLists} userId={userId} selectedList={selectedList} open={openAlert} setOpen={setOpenAlert} handleDelete={handleDelete} />
                }
        </div>
    )
}
