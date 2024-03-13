import Axios from 'axios';

async function PostLogin(email: string, password: string) {
    let data;

    await Axios.post('http://localhost:3333/user/login', {email: email, password: password})
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
