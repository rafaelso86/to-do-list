import Axios from 'axios';

async function PostLogin(email: string, password: string) {
    let data;

    await Axios.post('https://to-do-list-server-hg32.onrender.com/user/login', {email: email, password: password})
    .then((res) => {
        console.log('alguma coisa')
        console.log(res.data);
        data = res.data;
    })
    .catch((error) => {
        console.log(error)
    })

    return data;
}

export default PostLogin;
