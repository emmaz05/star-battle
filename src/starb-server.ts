/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This file runs in Node.js, see the `npm server` script.
// Remember that you will *not* be able to use DOM APIs in Node, only in the web browser.

import assert from 'node:assert';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';
import { Server } from 'node:http';


/**
 * Start a server that serves puzzles from the `puzzles` directory
 * on localhost:8789.
 */
// async function main(): Promise<void> {
//     // TODO
//     const app = express();
//     const PORT = 8789;
//     app.listen(PORT).on('listening', () => console.log(`now listening at http://localhost:${PORT}`));

//     // GET /echo?greeting=<string>
//     //
//     // response is a greeting including <string>
//     app.get('/puzzle', async (request: Request, response: Response) => {
//         // const data = await fs.promises.readFile("./puzzles/kd-1-1-1/starb", 'utf-8');
//         const data = "ddsfas";
//         // return data;
//         response
//             .status(StatusCodes.OK)
//             .type('text')
//             .send((data));
//     });
// }


 async function main(): Promise<void> {
    // const [portString, filename] 
    //     = process.argv.slice(2); // skip the first two arguments 
    //                              // (argv[0] is node executable file, argv[1] is this script)
    // if (portString === undefined) { throw new Error('missing PORT'); }
    // const port = parseInt(portString);
    // if (isNaN(port) || port < 0) { throw new Error('invalid PORT'); }
    // if (filename === undefined) { throw new Error('missing FILENAME'); }
    
    // const board = await Board.parseFromFile(filename);
    const PORT = 8789;
    const server = new WebServer(PORT);
    await server.start();
}


/**
 * HTTP web game server.
 */
class WebServer {

    private readonly app;
    private server: Server | undefined;

    /**
     * Make a new web game server using board that listens for connections on port.
     * 
     * @param board shared game board
     * @param requestedPort server port number
     */
    public constructor(
        // private readonly board: Board, 
        private readonly requestedPort: number
    ) {
        this.app = express();
        // this.app.use(express.static('public'));
        this.app.use((request, response, next) => {
            // allow requests from web pages hosted anywhere
            response.set('Access-Control-Allow-Origin', '*');
            next();
        });

        /*
         * GET /look/<playerId>
         * playerId must be a nonempty string of alphanumeric or underscore characters
         * 
         * Response is the board state from playerId's perspective, as described in the ps4 handout.
         */
        this.app.get('/puzzle', async(request, response) => {
            // const { playerId } = request.params;
            // assert(playerId);

            // const puzzle = "ada";
            // const data = await fs.promises.readFile("./puzzles/kd-6-31-6.starb", 'utf-8');
            const data = await fs.promises.readFile("./puzzles/kd-1-1-1.starb", 'utf-8');
            response
            .status(StatusCodes.OK) // 200
            .type('text')
            .send(data);
        });
        // this.app.get('', async(request, response) => {
        //     // const { playerId } = request.params;
        //     // assert(playerId);

        //     // const puzzle = "ada";
        //     const data = await fs.promises.readFile("./", 'utf-8');
        //     response
        //     .status(StatusCodes.OK) // 200
        //     .type('text')
        //     .send(data);
        // });

        /*
         * GET /
         *
         * Response is the game UI as an HTML page.
         */
        this.app.use(express.static('public/'));
    }

    /**
     * Start this server.
     * 
     * @returns (a promise that) resolves when the server is listening
     */
    public start(): Promise<void> {
        const { promise, resolve } = Promise.withResolvers<void>();
        this.server = this.app.listen(this.requestedPort);
        this.server.on('listening', () => {
            console.log(`server now listening at http://localhost:${this.port}`);
            resolve();
        });
        return promise;
    }

    /**
     * @returns the actual port that server is listening at. (May be different
     *          than the requestedPort used in the constructor, since if
     *          requestedPort = 0 then an arbitrary available port is chosen.)
     *          Requires that start() has already been called and completed.
     */
    public get port(): number {
        const address = this.server?.address() ?? 'not connected';
        if (typeof(address) === 'string') {
            throw new Error('server is not listening at a port');
        }
        return address.port;
    }

    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
    public stop(): void {
        this.server?.close();
        console.log('server stopped');
    }
}

await main();

/**
 * 
 async function sendRequest(): Promise<void> {
     try {
       const res = await fetch('http://localhost:8789');
       
     //   if (!res.ok) throw new Error(`HTTP ${res.status}`);
     //   const data = await res.text();      // matches the JSON we now send
     //   alert(data);
     } catch (err) {
       alert('Fetch failed: ' + err);
     }
   }
 // await sendRequest();
 
 async function main(): Promise<void> {
 
     // output area for printing
     const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
     // canvas for drawing
     const canvas: HTMLElement|null = document.getElementById('canvas');
     if ( ! (canvas instanceof HTMLCanvasElement)) { assert.fail('missing drawing canvas'); }
     alert("yogurt");
     // // await draw(canvas);
     alert("yo");
 
     // when the user clicks on the drawing canvas...
     // canvas.addEventListener('click',  (event: MouseEvent) => {
     //     drawBox(canvas, event.offsetX, event.offsetY);
     // });
     await sendRequest();
     
     // add initial instructions to the output area
     printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
 }
 
 const PORT = 8789;
 main();
 */