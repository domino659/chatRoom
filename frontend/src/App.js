import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Login from "./Auth/Login";
import UserProvider from "./Context/UserContext";
import { useState } from 'react';
import ChatRoom from './Component/ChatRoom';

function App() {

    const [userId, setUserId] = useState();
    const [loggedUserId, setLoggedUserId] = useState();
    const [chat, setChat] = useState();

    return (
        <UserProvider>
            <div className='d-flex h-100 bg-black'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={
                            <NeedAuth>
                                <UserList setUserId={setUserId} userId={userId} loggedUserId={loggedUserId} setChat={setChat} />
                                {userId ? <ChatRoom userId={userId} loggedUserId={loggedUserId} chat={chat} /> : ''}
                            </NeedAuth>
                        }/>
                        <Route path='/login' element={<Login setLoggedUserId={setLoggedUserId} />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
