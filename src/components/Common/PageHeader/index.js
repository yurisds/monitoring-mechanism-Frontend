import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const PageHeader = props => {

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
    
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button

                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {props.name}
                </Button>

            </Box>

        </Container>
        </AppBar>
    );
};

export default PageHeader;