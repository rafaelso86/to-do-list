import Axios from 'axios';

async function PostUpdateCheckTask(userId: number, checkId: number, checked: number ) {
    let dataUpdate;
    const token = await localStorage.getItem('token');

    await Axios.post(process.env.NEXT_PUBLIC_TODO_LIST_SERVER + 'tasks/check-update', 
        {user_id: userId, id: checkId, check: checked},
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

export default PostUpdateCheckTask;
