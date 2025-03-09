import axios from 'axios'
import {useEffect} from "react";

const AppHttpRequests = () => {
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists').then(res => {
            console.log(res.data)
        })
    }, [])

    return (
        <div>

        </div>
    );
};

export default AppHttpRequests;