import Axios from 'axios';

async function PostDeleteList(userId: number, id: number) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.post(process.env.NEXT_PUBLIC_TODO_LIST_SERVER + 'list/delete', 
        {user_id: userId, id: id},
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

export default PostDeleteList;
