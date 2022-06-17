import React from 'react';
import HistogramaDbList from '../../components/HistogramaDbList';
import ResponsiveAppBar from '../../components/Common/NavBar';

const HistogramaDbListPage = props => {
    return (
        <div>
            <ResponsiveAppBar/>
            <HistogramaDbList/>

        </div>
    );
};


export default HistogramaDbListPage;