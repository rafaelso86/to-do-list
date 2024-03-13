import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostDeleteList from '@/api/PostDeleteList';

interface IDeleteDialog {
    returnLists: () => void
    userId: string | null
    selectedList: any
    open: boolean
    setOpen: (newValue: boolean) => void
    handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number, id: number) => void
}

export default function DeleteDialog({returnLists, userId, selectedList, open, setOpen, handleDelete} : IDeleteDialog) {    
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveList = async () => {
        const data = await PostDeleteList(Number(userId), selectedList.id);
        if(data){
            returnLists();
            handleClose
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Você quer deletar a lista ${selectedList.title}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Assim que aceitar, tanto a lista quanto as tarefas vinculadas a ela serão deletadas.
                    </DialogContentText>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleRemoveList} autoFocus>
                        Aceitar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
