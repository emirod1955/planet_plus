//import react
import { useState, useEffect, useContext } from 'react';

//import axios
import axios from 'axios';

//import context
import { ResponseContext } from '../../context';

//import styles
import './HallOfFame.css'

//import img
import medal1 from '../../assets/img/medals/medal1.webp'
import medal2 from '../../assets/img/medals/medal2.webp'
import medal3 from '../../assets/img/medals/medal3.webp'
import medal4 from '../../assets/img/medals/medal4.webp'
import medal5 from '../../assets/img/medals/medal5.webp'
import medal6 from '../../assets/img/medals/medal6.webp'
import medal7 from '../../assets/img/medals/medal7.webp'
import medal8 from '../../assets/img/medals/medal8.webp'
import medal9 from '../../assets/img/medals/medal9.webp'
import medal10 from '../../assets/img/medals/medal10.webp'
import medal11 from '../../assets/img/medals/medal11.webp'
import medal12 from '../../assets/img/medals/medal12.webp'
import medal13 from '../../assets/img/medals/medal13.webp'

const HallOfFame = () =>{

    const { trueCount } = useContext(ResponseContext)
    const [topUsers, setTopUsers] = useState([]);

    const getImageSrc = (count) => {
        if (count < 8) return medal1;
        else if (count < 16) return medal2;
        else if (count < 24) return medal3;
        else if (count < 32) return medal4;
        else if (count < 40) return medal5;
        else if (count < 48) return medal6;
        else if (count < 56) return medal7;
        else if (count < 64) return medal8;
        else if (count < 72) return medal9;
        else if (count < 80) return medal10;
        else if (count < 86) return medal11;
        else if (count < 86) return medal12;
        return medal13;
    }

    getImageSrc(trueCount);

    useEffect(() => {
        axios.get('http://localhost:8081/top-users', {
          params: { exclude_google_id: '000000000000000000000' }
        })
        .then(response => {
          setTopUsers(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the top users!', error);
        });
    }, []);

    return(
        <div className='ranking'>
            <header>
                <h1>Top 20 Users 🏆</h1>
                <p>Meet the top 20 users who are making a significant impact on the environment. These individuals have completed the most tasks, showing their commitment to a greener future. Get inspired and see how you can make a difference too!</p>
            </header>
            <div className='tableBox'>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Actual award</th>
                            <th>Tasks Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topUsers.map((user, index) => (
                        <tr className='userBox' key={index}>
                            <td className='userBox-user'>
                                <img src={user.user_picture} alt={user.username}/>
                                <p>{user.username}</p>
                            </td>
                            <td className='hola'><img src={getImageSrc(user.nmbr_tsk_completed)} alt="" srcset="" /></td>
                            <td>
                                <p>{user.nmbr_tsk_completed}</p>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export {HallOfFame}