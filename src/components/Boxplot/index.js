import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import Plot from 'react-plotly.js';

const Boxplot = props => {

    return (
        <div>
            <Plot
                data={[

                { type: 'box', boxpoints: 'all', pointpos: 0, y: props.dbCommandList, text: props.dbNameList, name: `QTD ${props.commandsName}`, gridcolor: 'rgb(255, 255, 255)',},

                ]}
                layout={ {width: 1000, height: 900, title: `BoxPlot com os comandos de ${props.commandsName}`} }
            />
        </div>
    );
};



export default Boxplot;