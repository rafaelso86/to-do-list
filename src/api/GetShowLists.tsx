import Axios from 'axios';

async function GetShowLists(userId: number ) {
    let data;
    const token = await localStorage.getItem('token');

    await Axios.get('https://to-do-list-server-hg32.onrender.com/list/show/' + userId, 
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

export default GetShowLists;
