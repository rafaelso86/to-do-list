import Axios from 'axios';

async function PostDeleteList(userId: number, id: number) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.post('https://to-do-list-server-hg32.onrender.com/list/delete', 
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
