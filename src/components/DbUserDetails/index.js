import React from 'react';
import "./style.css"
import Plot from 'react-plotly.js';
import { Card } from 'antd';

const DbUserDetails = ({userStatistics}) => {

    return (
        <div className="body">

            <Card style={{ width: window.innerWidth * 0.24 }}>
            <p><b>Quantidade de Criação de Tabelas:</b> {userStatistics.create_table}</p>
            <p><b>Quantidade de Remoção de Tabelas:</b>  {userStatistics.drop_table}</p>
            <p><b>Quantidade de Atualização de Tabelas:</b>  {userStatistics.alter_table}</p>
            <p><b>Quantidade de Inserção de Dados:</b>  {userStatistics.insert}</p>
            <p><b>Quantidade de Remoção de Dados:</b>  {userStatistics.delete}</p>
            <p><b>Quantidade de Atualização de Dados:</b>  {userStatistics.update}</p>
            </Card>


            
           <Plot
                data={[

                {type: 'bar', x:[1], y: [userStatistics.varchar_type], name: "VARCHAR"},
                {type: 'bar', x:[2],  y: [userStatistics.text_type], name: "TEXT"},
                {type: 'bar', x:[3],  y: [userStatistics.integer_type], name: "INTEGER"},
                {type: 'bar', x:[4],  y: [userStatistics.smallint_type], name: "SMALLINT"},
                {type: 'bar', x:[5],  y: [userStatistics.char_type], name: "CHAR"},
                {type: 'bar', x:[6],  y: [userStatistics.date_type], name: "DATE"},
                {type: 'bar', x:[7],  y: [userStatistics.numeric_type], name: "NUMERIC"},
                {type: 'bar', x:[8],  y: [userStatistics.boolean_type], name: "BOOLEAN"},
                {type: 'bar', x:[9],  y: [userStatistics.bigint_type], name: "BIGINT"},

                ]}
                layout={ {width: window.innerWidth * 0.24, height: window.innerHeight * 0.375, title: 'Tipos de dados'} }
            />

        </div>
    );
};



export default DbUserDetails;