import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


const app = express();

const PORT = 8789;
app.listen(PORT).on('listening', () => {
    console.log(`now listening at http://localhost:${PORT}`);
});

// GET /puzzle?name=<filename>
//
// responds with the contents of the blank puzzle
app.get('/puzzle', async (request: Request, response: Response) => {
    
});

