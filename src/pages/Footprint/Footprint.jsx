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

    return(
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