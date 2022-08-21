import React from 'react';
import "./style.css"
import Plot from 'react-plotly.js';
import { Card } from 'antd';

const DbUserWorkHours = ({userStatistics}) => {

    return (
        <div className="body">

            <Card style={{ width: window.innerWidth * 0.24 }}>
            <p><b>Sessões de Estudos:</b> {userStatistics.studySessions}</p>
            <p><b>Qnt Estudos 00h - 03h:</b> {userStatistics.worked_0h_3h}</p>
            <p><b>Qnt Estudos 03h - 06h:</b> {userStatistics.worked_3h_6h}</p>
            <p><b>Qnt Estudos 06h - 09h:</b> {userStatistics.worked_6h_9h}</p>
            <p><b>Qnt Estudos 09h - 12h:</b> {userStatistics.worked_9h_12h}</p>
            <p><b>Qnt Estudos 12h - 15h:</b> {userStatistics.worked_12h_15h}</p>
            <p><b>Qnt Estudos 15h - 18h:</b> {userStatistics.worked_15h_18h}</p>
            <p><b>Qnt Estudos 18h - 21h:</b> {userStatistics.worked_18h_21h}</p>
            <p><b>Qnt Estudos 21h - 24h:</b> {userStatistics.worked_21h_24h}</p>
            </Card>

            <Plot
                data={[

                {type: 'bar', x:[1], y: [userStatistics.update], name: "UPDATE"},
                {type: 'bar', x:[2],  y: [userStatistics.update_without_where], name: "UPDATE sem WHERE"},
                {type: 'bar', x:[3],  y: [userStatistics.delete], name: "DELETE"},
                {type: 'bar', x:[4],  y: [userStatistics.delete_without_where], name: "DELETE sem WHERE"},

                ]}
                layout={ {width: window.innerWidth * 0.24, height: window.innerHeight * 0.275, title: 'Uso de UPDATE E DELETE'} }
            />

        </div>
    );
};



export default DbUserWorkHours;