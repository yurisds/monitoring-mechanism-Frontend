import React from 'react';
import { Layout, Button } from 'antd';
import { useNavigate  } from 'react-router-dom';
import ResponsiveAppBar from '../../components/Common/NavBar';

const { Content } = Layout;

const HomePage = props => {


    const navigate = useNavigate();


    return (
        <div>
            <ResponsiveAppBar/>
            <Layout>


            </Layout>

        </div>
    );
};

export default HomePage;