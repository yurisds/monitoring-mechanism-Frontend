import React from 'react';
import "./style.css"
import Plot from 'react-plotly.js';
import { Card } from 'antd';

const DbUserConstraint = ({userStatistics}) => {

    return (
        <div className="body">

            <Card style={{ width: window.innerWidth * 0.24 }}>
            <p><b>NOT NULL:</b>  {userStatistics.not_null_constraints}</p>
            <p><b>FOREIGN KEY:</b>  {userStatistics.foreign_key_constraints}</p>
            <p><b>PRIMARY KEY:</b>  {userStatistics.primary_key_constraints}</p>
            <p><b>CHECK:</b>  {userStatistics.check_constraints}</p>
            </Card>

            <Plot
                data={[

                {type: 'bar', x:[1], y: [userStatistics.alter_columns], name: "Alteração de colunas"},
                {type: 'bar', x:[2],  y: [userStatistics.add_columns], name: "Colunas adicionadas"},
                {type: 'bar', x:[3],  y: [userStatistics.add_constraint], name: "Constraint criadas"},
                {type: 'bar', x:[4],  y: [userStatistics.add_primary_key], name: "Adição de chave primária"},

                ]}
                layout={ {width: window.innerWidth * 0.24, height: window.innerHeight * 0.375, title: 'Alterações de tabela'} }
            />

        </div>
    );
};



export default DbUserConstraint