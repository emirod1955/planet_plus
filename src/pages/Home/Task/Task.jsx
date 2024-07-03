//import styles
import './Task.css'

import Check from './assets/check.png'

const HomeTask = ({title, state}) =>{
    return (
        <div className="task">
            <p style={{textDecoration : state ? 'line-through' : 'none'}}>{title}</p>
            {state == false ? <span></span> : <img src={Check} alt="check" />}
        </div>
    );
}

export {HomeTask}