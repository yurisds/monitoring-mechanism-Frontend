import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const HistogramaDbTypeNumericUsed = ({list}) => {

    const [ dbNameList, setDbNameList ] = useState([]);
    const [ dbIntegerList, setDbIntegerList ] = useState([]);
    const [ dbSmallintList, setDbSmallintList ] = useState([]);
    const [ dbBigintList, setDbBigintList ] = useState([]);
    const [ dbNumericList, setDbNumericList ] = useState([]);
    const [ dbBooleanList, setDbBooleanList ] = useState([]);

    useEffect( () => {
        getDbList();
    }, [])


    const getDbList = async () => {

        let dbNames = [];
        let dbInteger = [];
        let dbSmallint = [];
        let dbBigint = [];
        let dbNumeric = [];
        let dbBoolean = [];

        list.map( (db) => {

            dbNames.push(`User ${db.db_name}`);
            dbInteger.push(db.integer_type);
            dbSmallint.push(db.smallint_type);
            dbBigint.push(db.bigint_type);
            dbNumeric.push(db.numeric_type);
            dbBoolean.push(db.boolean_type);

        })

        setDbNameList(dbNames);
        setDbIntegerList(dbInteger);
        setDbSmallintList(dbSmallint);
        setDbBigintList(dbBigint);
        setDbNumericList(dbNumeric);
        setDbBooleanList(dbBoolean);

    }

    return (
        <div>

            <Plot
                data={[

                {type: 'bar', x: dbNameList, y: dbIntegerList, name: "INTEGER"},
                {type: 'bar', x: dbNameList, y: dbSmallintList, name: "SMALLINT"},
                {type: 'bar', x: dbNameList, y: dbBigintList, name: "BIGING"},
                {type: 'bar', x: dbNameList, y: dbNumericList, name: "NUMERIC"},
                {type: 'bar', x: dbNameList, y: dbBooleanList, name: "BOOLEAN"},

                ]}
                layout={ {width: window.innerWidth * 0.90, height: window.innerHeight * 0.87, title: 'Tipos Numéricos'} }
            />
            
        </div>
    );
};



export default HistogramaDbTypeNumericUsed;