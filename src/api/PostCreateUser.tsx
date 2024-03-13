import Axios from 'axios';

async function PostCreateUser(name: string, email: string, password: string) {
    let data;

    await Axios.post('http://localhost:3333/user/create', {name: name, email: email, password: password})
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

export default PostCreateUser;
