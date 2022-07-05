import * as React from 'react';
import "./style.css"
import { Layout, Menu, Button } from 'antd';
import { useNavigate  } from 'react-router-dom';
const { Header } = Layout;

const PageHeader = props => {

    const navigate = useNavigate();

    return (
        <div className='header-user'>
            <Header style={{
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                    marginLeft: "-2%"

                }}>
                <Button onClick={() => navigate('/statistics')} type="primary" htmlType="submit"> Voltar </Button>
            </Header >
            <Layout>
                <Header
                style={{
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    alignContent: 'center',
                    marginLeft: "-2%"
                }}
                >
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    >  
                    {props.name.toUpperCase()}
                    </Menu> 
                </Header>

            </Layout>
            <Header style={{
 
                    marginLeft: "-2%"

                }}/>
        </div>
    );
};

export default PageHeader;