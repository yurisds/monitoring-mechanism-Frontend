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

                <Content>

                <Button onClick={() => navigate('/statistics')} type="primary" htmlType="submit" >
                    
                    Estatísticas
                </Button>

                <Button onClick={() => navigate('/histograms')} type="primary" htmlType="submit" >
                    
                    Histogramas
                </Button>

                <Button onClick={() => navigate('/boxplots')} type="primary" htmlType="submit" >
                    
                    Boxplots
                </Button>

                </Content>
            </Layout>

        </div>
    );
};

export default HomePage;