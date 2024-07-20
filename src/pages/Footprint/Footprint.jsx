//import react
import { useEffect, useState } from "react";

//import react router
import { useNavigate } from "react-router-dom";

//import cookies
import Cookies from "js-cookie";

//impor charts
import { StyledEngineProvider } from "@mui/material/styles";
import { LineChart } from '@mui/x-charts/LineChart';

//import components
import { TaskFootprint } from "./TaskFootprint/TaskFootprint";

//import styles
import './Footprint.css'

const Graph = () =>{
    return(
        <StyledEngineProvider injectFirst>
            <div className="graphBox">
                <LineChart
                    xAxis={[{ data: [1, 3, 5, 8, 10] }]}
                    series={[
                        { curve: "natural", data: [-1, 2, 6, 3, 9.3], color: '#7BAC23'},
                        { curve: "natural", data: [6, 7, 9.5, 4, 6], color: '#666666'}
                    ]}
                    axisHighlight={{
                        x: 'none', 
                        y: 'none', 
                    }}
                    leftAxis={null}
                    bottomAxis={null}
                />
            </div>
        </StyledEngineProvider>
    );
}

const Footprint = () =>{
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async (accessToken) => {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
        const data = await response.json();
        setUserDetails(data);
    };

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if (!accessToken) {
            navigate("/");
        }

        getUserDetails(accessToken);
    }, [navigate]);

    return(
        <>
            {userDetails ? (
                <div className="footprint">
                        <div className="footprintBox">
                            <div className="footprint-top">
                                <div className="footprintText-top">
                                    <h1>Overview</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus, nisi dignissim laoreet tempor, nisl leo malesuada dui, vitae vehicula sem lectus sit amet quam. Duis congue neque quam. Proin maximus leo a mauris posuere, sed iaculis dui efficitur. Nulla facilisi. Mauris quis enim ac justo interdum egestas ut ac justo. Donec lacus felis, molestie non feugiat nec, hendrerit ullamcorper libero.</p>
                                </div>
                                <div className="footprintGraph-bottom">
                                    <div className="footprintText-bottom">
                                        <h2>382 kg</h2>
                                        <p><span style={{color: '#7BAC23', fontWeight: '700'}}>Your carbon footprint</span> in the last week</p>
                                        <p>That's 75kg CO₂ above <span style={{color: '#666666', fontWeight: '700'}}>average</span></p>
                                    </div>
                                    <Graph/>
                                </div>
                            </div>
                            <div className="footprint-bottom">
                                <TaskFootprint title="Recycle plastic" content="Recycling plastic contributes to your carbon footprint due to the energy-intensive processes involved in collecting, transporting, and reprocessing the plastic, which often rely on fossil fuels." state={false}/>
                                <TaskFootprint title="Consume less energy" content="Using less energy lowers your carbon footprint by reducing the need for electricity and fuels, which are often produced from carbon-heavy sources. This cuts down greenhouse gas emissions, aiding climate change mitigation." state={true}/>
                                <TaskFootprint title="Don't use the car" content="Not using a car reduces your carbon footprint by cutting down on the emissions of carbon dioxide and other greenhouse gases from burning fossil fuels. It also decreases the demand for fuel production, which has its own carbon costs, and reduces traffic congestion, leading to fewer emissions overall." state={true}/>
                                <TaskFootprint title="Recycle cardboard" content="Recycling cardboard contributes to your carbon footprint because the collection, transportation, and processing of cardboard require energy, often from fossil fuels. However, it is still more eco-friendly than producing new cardboard from raw materials, as it reduces deforestation and the energy needed for production." state={false}/>
                            </div>
                        </div>
                </div>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </>
    );
}

export {Footprint}