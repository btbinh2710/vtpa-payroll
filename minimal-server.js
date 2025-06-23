const express = require('express');
const app = express();

// Basic CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint working!' });
});

// Basic HTML response
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>VTPA Payroll - Test</title>
        </head>
        <body>
            <h1>VTPA Payroll Backend</h1>
            <p>Server is running successfully!</p>
            <p>Time: ${new Date().toISOString()}</p>
            <p><a href="/health">Health Check</a></p>
            <p><a href="/test">Test Endpoint</a></p>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Minimal server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 