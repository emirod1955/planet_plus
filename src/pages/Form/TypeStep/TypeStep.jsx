//import styles
import './TypeStep.css'

const TypeStep = ({title, description, placeholder, unity, sup, examples}) =>{
    return(
        <div className='typeStep'>
            <div className='typeStepBox'>
                <h1>{title}</h1>
                <p className='typeStepBox-des'>{description}</p>
                <div className='typeStepBox-input'>
                    <input type="text" name="" id="" placeholder={placeholder}/>
                    <p>{unity}<sup>{sup}</sup></p>
                </div>
                <p className='typeStepBox-ex'>{examples}</p>
            </div>
        </div>
    );
}

export {TypeStep}