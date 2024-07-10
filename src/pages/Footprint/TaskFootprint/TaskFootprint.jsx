//import img
import check from '../../../assets/img/check.svg'

//import styles
import './TaskFootprint.css'

const TaskFootprint = ({title, content, state}) => {
    return(
        <div className='TaskFootprint'>
            <h3>{title}</h3>
            <p className='TaskFootprint-content'>{content}</p>
            <div className='TaskFootprint-bottom'>
                <button style={{backgroundColor : state ? '#00ba00' : '#685CFE'}}>
                    <p style={{display : state ? 'none' : 'block'}}>verify</p>
                    <img src={check} alt="check" />
                </button>
            </div>
        </div>
    );
}

export {TaskFootprint}