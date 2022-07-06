import React from 'react';
import "./style.css"

import ResponsiveAppBar from '../../components/Common/NavBar';
import DbList from '../../components/DbList';

const DbListPage = props => {

    return (
        <>
            <ResponsiveAppBar/>

            <div> 
                <DbList/>
            </div>
        </>
    );
};


export default DbListPage;