import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Box from '@mui/material/Box';
import Header from './components/Header/Header';



function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header/>

        </Box>
    );
}

export default App;
