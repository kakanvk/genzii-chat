// Import thêm `useEffect` và `useState` từ React
import { useEffect, useState } from 'react';
import InChat from '../InChat/InChat';

import { db } from '../../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

import './Chat.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';

let userChatList = {};

function Chat() {
    
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState({});
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const [completedLoad, setCompletedLoad] = useState(false);

    const fetchDataUser = () => {
        setLoading(true);
        const fetchData1 = axios.get(`https://genzii-api.vhiep.com/api/auth/profile`, { withCredentials: true });

        Promise.all([fetchData1])
            .then(responses => {
                const cur_user = responses[0].data.data.profile;
                setCurrentUser(cur_user);
                fetchChatsOfCurrentUser(cur_user);
                // console.log(cur_user);
                setLoading(false);
            })
            .catch(error => {
                // console.error('Error fetching data:', error);
            });
    }

    const getUserbyUid = (uid) => {
        // Giữ nguyên phần này
    }
    
    const fetchChatsOfCurrentUser = (cur_user) => {
        
        try {
            if (cur_user) {
                const chatRef = query(collection(db, 'users', cur_user.uid, "chats"));

                const unsubscribe = onSnapshot(chatRef, async (querySnapshot) => {
                    let chats_arr = [];
                    let id_arr = [];
                    await querySnapshot.forEach((doc) => {
                        if (!userChatList?.[doc.id]) {
                            id_arr.push(doc.id);
                        }
                    });
                    if (id_arr.length > 0) {
                        const resProfile = await axios.post(`https://genzii-api.vhiep.com/api/user/profile`, {
                            uid: id_arr,
                            group: true
                        },{ withCredentials: true });
                        userChatList = {...userChatList, ...resProfile.data.data};
                    }
                    
                    console.log(userChatList);
                    querySnapshot.forEach(async (doc) => {
                        chats_arr.push({ id: doc.id, ...doc.data(), avt: userChatList?.[doc.id]?.current_avatar.url });
                    });

                    chats_arr.sort((a, b) => b.timestamp - a.timestamp);
                    setChats(chats_arr);
                });

                return unsubscribe;
            }
        } catch (error) {
            // console.error('Error fetching units data:', error);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [completedLoad])

    return (
        <div className="Chat">
            <div className='Chat_nav'>
                <h2>Tin nhắn</h2>
                <div className='Chat_nav-searchbox'>
                    <ion-icon name="search"></ion-icon>
                    <input type='text' placeholder='Tìm kiếm' />
                </div>
                <div className='Chat_nav-message-container'>
                    {
                        loading ?
                            <div className='Loading'>
                                <div className="dashed-loading"></div>
                            </div>
                            :
                            chats.map((chat, index) => (
                                <Link
                                    key={index}
                                    className={location.pathname.includes(chat.id) ? 'nav_message-item msg-active' : 'nav_message-item'}
                                    to={chat.id}
                                >
                                    <div className='nav_message-item-img'>
                                        <img src={chat.avt} alt={chat.id} />
                                    </div>
                                    <div className='nav_message-item-msg'>
                                        <h3>{chat.id}</h3>
                                        <span>{currentUser.uid === chat.from ? "Bạn: " + chat.last_message : chat.last_message}</span>
                                    </div>
                                </Link>
                            ))
                    }
                </div>
            </div>
            <div className='Chat_content'>
                <Routes>
                    <Route path=':id' element={<InChat key={location.pathname} setCompletedLoad={setCompletedLoad}/>} />
                </Routes>
            </div>
        </div>
    );
}

export default Chat;
