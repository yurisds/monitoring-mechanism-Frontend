import React from 'react';

import ResponsiveAppBar from '../../components/Common/NavBar';
import DbList from '../../components/DbList';

const DbListPage = props => {

    return (
        <>
            <ResponsiveAppBar/>
            <DbList/>

        </>
    );
};


export default DbListPage;