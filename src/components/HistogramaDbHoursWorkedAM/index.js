import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const HistogramaDbHoursWorkedAM = ({list}) => {

    const [ dbNameList, setDbNameList ] = useState([]);
    const [ dbWorked_0h_3hList, setDbWorked_0h_3hList ] = useState([]);
    const [ dbWorked_3h_6hList, setDbWorked_3h_6hList ] = useState([]);
    const [ dbWorked_6h_9hList, setDbWorked_6h_9hList ] = useState([]);
    const [ dbWorked_9h_12hList, setDbWorked_9h_12hList ] = useState([]);

    useEffect( () => {
        getDbList();
    }, [])


    const getDbList = async () => {

        let dbNames = [];
        let dbWorked_0h_3h = [];
        let dbWorked_3h_6h = [];
        let dbWorked_6h_9h = [];
        let dbWorked_9h_12h = [];

        list.map( (db) => {

            dbNames.push(db.db_name);
            dbWorked_0h_3h.push(db.worked_0h_3h);
            dbWorked_3h_6h.push(db.worked_3h_6h);
            dbWorked_6h_9h.push(db.worked_6h_9h);
            dbWorked_9h_12h.push(db.worked_9h_12h);

        })

        setDbNameList(dbNames);
        setDbWorked_0h_3hList(dbWorked_0h_3h);
        setDbWorked_3h_6hList(dbWorked_3h_6h);
        setDbWorked_6h_9hList(dbWorked_6h_9h);
        setDbWorked_9h_12hList(dbWorked_9h_12h);

    }

    return (
        <div>

            <Plot
                data={[

                {type: 'bar', x: dbNameList, y: dbWorked_0h_3hList, name: "Período 00h-03h"},
                {type: 'bar', x: dbNameList, y: dbWorked_3h_6hList, name: "Período 03h-06h"},
                {type: 'bar', x: dbNameList, y: dbWorked_6h_9hList, name: "Período 06h-09h"},
                {type: 'bar', x: dbNameList, y: dbWorked_9h_12hList, name: "Período 09h-12h"},

                ]}
                layout={ {width: window.innerWidth * 0.90, height: window.innerHeight * 0.87, title: 'Interação no Período das 00h ás 12h'} }
            />
            
        </div>
    );
};



export default HistogramaDbHoursWorkedAM;