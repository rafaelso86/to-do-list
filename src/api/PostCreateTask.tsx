import Axios from 'axios';

async function PostCreateTask(userId: number, id: number, name: string, check: number) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.post('http://localhost:3333/task/create', 
        {user_id: userId, list_id: id, name: name, check: check},
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

export default PostCreateTask;
