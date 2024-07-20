//import multi step
import MultiStep from 'react-multistep';

//import components
import {TypeStep} from './TypeStep/TypeStep'

import './Form.css'

const Form = () =>{
    return(
        <div className='Form'>
            <MultiStep
                prevButton={{
                    title: "Back", 
                    style: {
                        background: '#fff',
                        padding: '1rem 2rem',
                        color: '#000',
                        border: 'none',
                        borderRadius: '.5rem'
                    }}}
                nextButton={{
                    title: "Next",
                    style: {
                        background: '#fff',
                        padding: '1rem 2rem',
                        color: '#000',
                        border: 'none',
                        borderRadius: '.5rem'
                    }}}
            >
                <TypeStep 
                    title='What country do you live in?'
                    description='Regional differences in energy sources, climate, transportation options, local food production, building standards, and waste management significantly impact your carbon emissions. This information help us to provide you more accurate and tailored estimates of your carbon footprint.'
                    placeholder='Type your country here...'
                    unity=""
                    sup=""
                    examples='For example: United States, Spain, Uruguay, etc.'
                />
                <TypeStep
                    title='Surface area of your home'
                    description="The surface area of your home influences the amount of energy required for heating, cooling, and lighting. Larger homes generally consume more energy, which can lead to higher carbon emissions. This information helps us to estimate your household's energy use more accurately."
                    placeholder='Type a number here...'
                    unity="m"
                    sup="2"
                    examples='For example: 43, 82, 110, etc.'
                />
            </MultiStep>
        </div>
    );
}

export {Form}