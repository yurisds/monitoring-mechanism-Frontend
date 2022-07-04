import React from 'react';
import "./style.css"
import { Card } from 'antd';

const DbUserWorkHours = ({userStatistics}) => {

    return (
        <div className="body">

            <Card style={{ width: window.innerWidth * 0.24 }}>
            <p>Sessões de Estudos: {userStatistics.studySessions}</p>
            <p>Qnt Estudos 00h - 03h: {userStatistics.worked_0h_3h}</p>
            <p>Qnt Estudos 03h - 06h: {userStatistics.worked_3h_6h}</p>
            <p>Qnt Estudos 06h - 09h: {userStatistics.worked_6h_9h}</p>
            <p>Qnt Estudos 09h - 12h: {userStatistics.worked_9h_12h}</p>
            <p>Qnt Estudos 12h - 15h: {userStatistics.worked_12h_15h}</p>
            <p>Qnt Estudos 15h - 18h: {userStatistics.worked_15h_18h}</p>
            <p>Qnt Estudos 18h - 21h: {userStatistics.worked_18h_21h}</p>
            <p>Qnt Estudos 21h - 24h: {userStatistics.worked_21h_24h}</p>
            </Card>

        </div>
    );
};



export default DbUserWorkHours;