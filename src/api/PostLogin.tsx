import Axios from 'axios';

async function PostLogin(email: string, password: string) {
    let data;

    await Axios.post(process.env.NEXT_PUBLIC_TODO_LIST_SERVER + 'user/login', {email: email, password: password})
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
