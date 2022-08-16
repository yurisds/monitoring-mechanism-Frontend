import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const HistogramaDbList = ({list}) => {

    const [ dbNameList, setDbNameList ] = useState([]);
    const [ dbCreateList, setDbCreateList ] = useState([]);
    const [ dbDropList, setDbDropList ] = useState([]);
    const [ dbAlterList, setDbAlterList ] = useState([]);
    const [ dbInsertList, setDbInsertList ] = useState([]);
    const [ dbUpdateList, setDbUpdateList ] = useState([]);
    const [ dbDeleteList, setDbDeleteList ] = useState([]);

    useEffect( () => {
        getDbList();
    }, [])


    const getDbList = async () => {

        let dbNames = [];
        let dbCreate = [];
        let dbDrop = [];
        let dbAlter = [];
        let dbInsert = [];
        let dbUpdate = [];
        let dbDelete = [];

        list.map( (db) => {

            dbNames.push(`User ${db.db_name}`);
            dbCreate.push(db.create_table);
            dbDrop.push(db.drop_table);
            dbAlter.push(db.alter_table);
            dbInsert.push(db.insert);
            dbUpdate.push(db.update);
            dbDelete.push(db.delete);

        })

        setDbNameList(dbNames);
        setDbCreateList(dbCreate);
        setDbDropList(dbDrop);
        setDbAlterList(dbAlter);
        setDbInsertList(dbInsert);
        setDbUpdateList(dbUpdate);
        setDbDeleteList(dbDelete);

    }

    return (
        <div>

            <Plot
                data={[

                {type: 'bar', x: dbNameList, y: dbCreateList, name: "CREATE TABLE"},
                {type: 'bar', x: dbNameList, y: dbDropList, name: "DROP TABLE"},
                {type: 'bar', x: dbNameList, y: dbAlterList, name: "ALTER TABLE"},
                {type: 'bar', x: dbNameList, y: dbInsertList, name: "INSERT"},
                {type: 'bar', x: dbNameList, y: dbUpdateList, name: "UPDATE"},
                {type: 'bar', x: dbNameList, y: dbDeleteList, name: "DELETE"},

                ]}
                layout={ {width: window.innerWidth * 0.90, height: window.innerHeight * 0.87, title: 'Comandos DDL e DML'} }
            />

            
        </div>
    );
};



export default HistogramaDbList;