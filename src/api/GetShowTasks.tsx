import Axios from 'axios';

async function GetShowTasks(userId: number, listId: number ) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.get('http://localhost:3333/tasks/show/' + userId + '/' + listId, 
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
