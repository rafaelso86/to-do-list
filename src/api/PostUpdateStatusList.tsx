import Axios from 'axios';

async function PostUpdateStatusList(userId: number, listId: number, status: string ) {
    let dataUpdate;
    const token = await localStorage.getItem('token');

    await Axios.post('https://to-do-list-server-hg32.onrender.com/list/status-update', 
        {user_id: userId, list_id: listId, status: status},
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )
    .then((res) => {
        dataUpdate = res.data;
    })
    .catch((error) => {
        console.log(error)
    })

    return dataUpdate;
}

export default PostUpdateStatusList;
