const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ 
        message: 'VTPA Payroll Backend is running!',
        timestamp: new Date().toISOString(),
        status: 'OK'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Test server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 