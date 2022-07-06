import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
const ss = require('simple-statistics')

const CorrelationList = ({list}) => {

    const [ dbCreateList, setDbCreateList ] = useState([]);
    const [ dbDropList, setDbDropList ] = useState([]);
    const [ dbAlterList, setDbAlterList ] = useState([]);
    const [ dbInsertList, setDbInsertList ] = useState([]);
    const [ dbUpdateList, setDbUpdateList ] = useState([]);
    const [ dbDeleteList, setDbDeleteList ] = useState([]);

    const [ dbWorked_12h_15hList, setDbWorked_12h_15hList ] = useState([]);
    const [ dbWorked_15h_18hList, setDbWorked_15h_18hList ] = useState([]);
    const [ dbWorked_18h_21hList, setDbWorked_18h_21hList ] = useState([]);
    const [ dbWorked_21h_24hList, setDbWorked_21h_24hList ] = useState([]);

    const [corr, setCorr] = useState([])

    const [loading, setLoading] = useState(false);

    useEffect( () => {
        getDbList();
        setLoading(true);
    }, [])


    const getDbList = async () => {

        let dbCreate = [];
        let dbDrop = [];
        let dbAlter = [];
        let dbInsert = [];
        let dbUpdate = [];
        let dbDelete = [];

        let dbWorked_12h_15h = [];
        let dbWorked_15h_18h = [];
        let dbWorked_18h_21h = [];
        let dbWorked_21h_24h = [];

        list.map( (db) => {

            dbCreate.push(db.create_table);
            dbDrop.push(db.drop_table);
            dbAlter.push(db.alter_table);
            dbInsert.push(db.insert);
            dbUpdate.push(db.update);
            dbDelete.push(db.delete);

            dbWorked_12h_15h.push(db.worked_12h_15h);
            dbWorked_15h_18h.push(db.worked_15h_18h);
            dbWorked_18h_21h.push(db.worked_18h_21h);
            dbWorked_21h_24h.push(db.worked_21h_24h);

        })

        setDbCreateList(dbCreate);
        setDbDropList(dbDrop);
        setDbAlterList(dbAlter);
        setDbInsertList(dbInsert);
        setDbUpdateList(dbUpdate);
        setDbDeleteList(dbDelete);

        setDbWorked_12h_15hList(dbWorked_12h_15h);
        setDbWorked_15h_18hList(dbWorked_15h_18h);
        setDbWorked_18h_21hList(dbWorked_18h_21h);
        setDbWorked_21h_24hList(dbWorked_21h_24h);
    }

    const getCorr = () => {
        
        if(dbCreateList.length > 0 && dbDropList.length > 0 ){

            const array = [dbCreateList, dbDropList, dbAlterList, dbInsertList, dbWorked_12h_15hList, dbWorked_15h_18hList, dbWorked_18h_21hList, dbWorked_21h_24hList]

            let principal = []

            array.forEach((a) => {

                let aux = []

                array.forEach((b) => {
                    aux.push(ss.sampleCorrelation(a, b).toFixed(2))
                })

                principal.push(aux)

            })

            setCorr(principal)
            setLoading(false)
            return principal
        }
        setLoading(false)
        return []

    }


      const layout = {
        title: 'Person Correlations', 

        xaxis: {automargin: true}, 
        yaxis: {automargin: true}, 
        width: window.innerWidth * 0.85, 
        height: window.innerHeight * 0.80,
        autosize: false, 
        showlegend: true,

        font: {
            family: 'Arial',
            size: 12,
          },
          
      };

    return (
        <div>

            {loading ? (
                getCorr()
            
            ) : (
                <div> </div>
            )}
            
            <Plot
                
                data={[{
                    type: 'heatmap', 
                    x: ["CREATE", "DROP", "ALTER", "INSERT", "12-15", "15-18", "18-21", "21-24"],
                    y: ["CREATE", "DROP", "ALTER", "INSERT", "12-15", "15-18", "18-21", "21-24"],
                    z: [...corr],

                  }]}
                layout={layout}
            />
            
        </div>
    );
};



export default CorrelationList;