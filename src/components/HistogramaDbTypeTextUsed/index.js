import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const HistogramaDbTypeTextUsed = ({list}) => {

    const [ dbNameList, setDbNameList ] = useState([]);
    const [ dbVarcharList, setDbVarcharList ] = useState([]);
    const [ dbTextList, setDbTextList ] = useState([]);
    const [ dbCharList, setDbCharList ] = useState([]);
    const [ dbDateList, setDbDateList ] = useState([]);

    useEffect( () => {
        getDbList();
    }, [])


    const getDbList = async () => {

        let dbNames = [];
        let dbVarchar = [];
        let dbText = [];
        let dbChar = [];
        let dbDate = [];

        list.map( (db) => {

            dbNames.push(db.db_name);
            dbVarchar.push(db.varchar_type);
            dbText.push(db.text_type);
            dbChar.push(db.char_type);
            dbDate.push(db.date_type);

        })

        setDbNameList(dbNames);
        setDbVarcharList(dbVarchar);
        setDbTextList(dbText);
        setDbCharList(dbChar);
        setDbDateList(dbDate);

    }

    return (
        <div>

            <Plot
                data={[

                {type: 'bar', x: dbNameList, y: dbVarcharList, name: "VARCHAR"},
                {type: 'bar', x: dbNameList, y: dbTextList, name: "TEXT"},
                {type: 'bar', x: dbNameList, y: dbCharList, name: "CHAR"},
                {type: 'bar', x: dbNameList, y: dbDateList, name: "DATE"},

                ]}
                layout={ {width: window.innerWidth * 0.90, height: window.innerHeight * 0.87, title: 'Tipos Textuais'} }
            />
            
        </div>
    );
};



export default HistogramaDbTypeTextUsed;