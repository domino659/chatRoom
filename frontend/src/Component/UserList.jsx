import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useGetChatByUsersId from "../Hook/userGetChatByUsersId";

export default function UserList(props) {
    const [userList, setUserList] = useState([]);

    const getUserList = useGetUserList();
    const getChatByUsers = useGetChatByUsersId();

    const userChoice = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        props.setUserId(userId);
        getChatByUsers(props.loggedUserId, userId).then(res => props.setChat(res));
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
    }, [])

    return (
        <div className="h-100" style={{width: '250px', borderRight: '0.5px solid gray'}}>
            <div style={{padding: '20px 10px'}} className="d-flex text-white justify-content-between">
                <span style={{fontWeight: "700"}}>ChatRoom</span>
            </div>
            {userList.map((user) => (
                user.id != props.loggedUserId ? 
                <form className='w-100 mx-auto' onSubmit={userChoice}>
                    <button style={{height: '60px'}} className='d-flex border-0 w-100 bg-transparent text-white' type='submit' value={user.id}>
                        <div className="d-flex flex-column" style={{padding: '5px 0 5px 3px'}}>
                            <span style={{fontWeight: '600', textAlign: 'left'}}>{user.username}</span>
                            <div className="d-flex" style={{fontSize: '10px', color: '#6c757d'}}>
                            </div>
                        </div>
                    </button>
                </form>
                : ''
            ))}
        </div>
    )
}