import React from 'react';

import Plot from 'react-plotly.js';

const Boxplot = ({dbCommandList, dbNameList, commandsName}) => {

    return (
        <div>
            <Plot
                data={[

                { type: 'box', boxpoints: 'all', pointpos: 0, y: dbCommandList, text: dbNameList, name: `QTD ${commandsName}`, gridcolor: 'rgb(255, 255, 255)',},

                ]}
                layout={ {width: 900, height: 900, title: `BoxPlot com os comandos de ${commandsName}`} }
            />
        </div>
    );
};



export default Boxplot;