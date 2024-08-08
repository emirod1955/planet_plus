//import react
import { useContext } from 'react'

//import context
import { ResponseContext } from '../../../context'

//import styles
import './Medal.css'


const Medal = ({medal, num}) =>{
    const { trueCount } = useContext(ResponseContext)
    
    return(
        <div className="medal">
            <img style={{filter: trueCount < num ? 'grayscale(100%)' : 'none'}} src={medal} alt="medal" />
            <p>{num} tasks completed</p>
        </div>
    )
}

export {Medal}