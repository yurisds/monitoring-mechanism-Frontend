import React, { useEffect, useState } from 'react';
import Boxplot from '../../components/Boxplot';
import axios from 'axios';
import ResponsiveAppBar from '../../components/Common/NavBar';


const BoxplotPage = props => {


    const api = axios.create({
        baseURL: "http://localhost:3003",
    });
    

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

        const response = await api.get("/statistics");

        let dbNames = [];
        let dbCreate = [];
        let dbDrop = [];
        let dbAlter = [];
        let dbInsert = [];
        let dbUpdate = [];
        let dbDelete = [];

        response.data.map( (db) => {

            dbNames.push(db.db_name);
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
            <ResponsiveAppBar/>
            <Boxplot dbNameList={dbNameList} dbCommandList={dbCreateList} commandsName="CREATE TABLE" />
            <Boxplot dbNameList={dbNameList} dbCommandList={dbDropList} commandsName="DROP TABLE"/>
            <Boxplot dbNameList={dbNameList} dbCommandList={dbAlterList} commandsName="ALTER TABLE"/>
            <Boxplot dbNameList={dbNameList} dbCommandList={dbInsertList} commandsName="INSERT"/>
            <Boxplot dbNameList={dbNameList} dbCommandList={dbUpdateList} commandsName="UPDATE"/>
            <Boxplot dbNameList={dbNameList} dbCommandList={dbDeleteList} commandsName="DELETE"/>

        </div>
    );
};


export default BoxplotPage;