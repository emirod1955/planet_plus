//import react
import { useContext, useState, useEffect } from "react";

import axios from "axios";

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

const Footprint = () =>{

    const { overview, trueCount } = useContext(ResponseContext)

    const [average, setAverage] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8081/average-tasks-completed')
        .then(response => {
            setAverage(response.data.average);
        })
        .catch(error => {
            console.error('There was an error fetching the average tasks completed!', error);
        });
    }, []);



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
                                            <h2>{trueCount} Tasks</h2>
                                            <p><span style={{color: '#7BAC23', fontWeight: '700'}}>You have completed</span> {trueCount} tasks on this journey</p>
                                            <p>That's {Math.abs(trueCount - average.toFixed(2))} tasks {trueCount > average.toFixed(2) ? "above" : "below"} <span style={{color: '#666666', fontWeight: '700'}}>average</span></p>
                                        </div>
                                        <StyledEngineProvider injectFirst>
                                            <div className="graphBox">
                                                <LineChart
                                                    xAxis={[{ data: [1, 3, 5, 8, 10] }]}
                                                    series={[
                                                        { curve: "natural", data: [0, 0.2*(trueCount), 0.5*(trueCount), 0.2*(trueCount), trueCount], color: '#7BAC23'},
                                                        { curve: "natural", data: [0, average.toFixed(2)*0.2, average.toFixed(2)*0.5, average.toFixed(2)*0.2, average.toFixed(2)], color: '#666666'}
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