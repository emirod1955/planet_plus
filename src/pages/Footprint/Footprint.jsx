//import react
import { useContext } from "react";

//import context
import { ResponseContext } from "../../context";

//impor charts
import { StyledEngineProvider } from "@mui/material/styles";
import { LineChart } from '@mui/x-charts/LineChart';

//import components
import { TaskFootprint } from "./TaskFootprint/TaskFootprint";

//import styles
import './Footprint.css'
import '../../assets/loading.css'

const Graph = () =>{
    const { trueCount } = useContext(ResponseContext)

    return(
        <StyledEngineProvider injectFirst>
            <div className="graphBox">
                <LineChart
                    xAxis={[{ data: [1, 3, 5, 8, 10] }]}
                    series={[
                        { curve: "natural", data: [-1, 2, 5, 3, trueCount], color: '#7BAC23'},
                        { curve: "natural", data: [2, 1, 4, 1, 2], color: '#666666'}
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

    const { overview } = useContext(ResponseContext)

    return(
                    <div className="footprint">
                            <div className="footprintBox">
                                <div className="footprint-top">
                                    <div className="footprintText-top">
                                        <h1>Overview</h1>
                                        {overview == '' ?
                                        <div className="overviewLoading">
                                            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                         </div>
                                         : <p>{overview}</p> 
                                        }
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
                                    <TaskFootprint unique={0} />
                                    <TaskFootprint unique={1} />
                                    <TaskFootprint unique={2} />
                                    <TaskFootprint unique={3} />
                                </div>
                            </div>
                    </div>
    );
}

export {Footprint}