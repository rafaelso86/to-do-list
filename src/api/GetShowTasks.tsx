import Axios from 'axios';

async function GetShowTasks(userId: number, listId: number ) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.get('https://to-do-list-server-hg32.onrender.com/tasks/show/' + userId + '/' + listId, 
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
