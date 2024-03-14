import Axios from 'axios';

async function GetShowTasks(userId: number, listId: number ) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.get(process.env.NEXT_PUBLIC_TODO_LIST_SERVER + 'tasks/show/' + userId + '/' + listId, 
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
    .then((res) => {
        data = res.data;
    })
    .catch((error) => {
        console.log(error)
    })

    return data;
}

export default GetShowTasks;
