import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const HistogramaDbHoursWorkedPM = ({list}) => {

    const [ dbNameList, setDbNameList ] = useState([]);
    const [ dbWorked_12h_15hList, setDbWorked_12h_15hList ] = useState([]);
    const [ dbWorked_15h_18hList, setDbWorked_15h_18hList ] = useState([]);
    const [ dbWorked_18h_21hList, setDbWorked_18h_21hList ] = useState([]);
    const [ dbWorked_21h_24hList, setDbWorked_21h_24hList ] = useState([]);

    useEffect( () => {
        getDbList();
    }, [])


    const getDbList = async () => {

        let dbNames = [];
        let dbWorked_12h_15h = [];
        let dbWorked_15h_18h = [];
        let dbWorked_18h_21h = [];
        let dbWorked_21h_24h = [];

        list.map( (db) => {

            dbNames.push(db.db_name);
            dbWorked_12h_15h.push(db.worked_12h_15h);
            dbWorked_15h_18h.push(db.worked_15h_18h);
            dbWorked_18h_21h.push(db.worked_18h_21h);
            dbWorked_21h_24h.push(db.worked_21h_24h);

        })

        setDbNameList(dbNames);
        setDbWorked_12h_15hList(dbWorked_12h_15h);
        setDbWorked_15h_18hList(dbWorked_15h_18h);
        setDbWorked_18h_21hList(dbWorked_18h_21h);
        setDbWorked_21h_24hList(dbWorked_21h_24h);

    }

    return (
        <div>

            <Plot
                data={[

                {type: 'bar', x: dbNameList, y: dbWorked_12h_15hList, name: "Período 12h-15h"},
                {type: 'bar', x: dbNameList, y: dbWorked_15h_18hList, name: "Período 15h-18h"},
                {type: 'bar', x: dbNameList, y: dbWorked_18h_21hList, name: "Período 18h-21h"},
                {type: 'bar', x: dbNameList, y: dbWorked_21h_24hList, name: "Período 21h-24h"},

                ]}
                layout={ {width: window.innerWidth * 0.90, height: window.innerHeight * 0.87, title: 'Interação no Período das 12h ás 24h'} }
            />
            
        </div>
    );
};



export default HistogramaDbHoursWorkedPM;