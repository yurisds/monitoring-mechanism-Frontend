import React from 'react';
import "./style.css"
import { Card } from 'antd';

const DbUserConstraint = ({userStatistics}) => {

    return (
        <div className="body">

            <Card style={{ width: window.innerWidth * 0.24 }}>
            <p>NOT NULL: {userStatistics.not_null_constraints}</p>
            <p>FOREIGN KEY: {userStatistics.foreign_key_constraints}</p>
            <p>PRIMARY KEY: {userStatistics.primary_key_constraints}</p>
            <p>CHECK: {userStatistics.check_constraints}</p>
            </Card>

        </div>
    );
};



export default DbUserConstraint