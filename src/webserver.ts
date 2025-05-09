import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';
import { Server } from 'node:http';
/**
 * HTTP web game server.
 */
export class WebServer {
    /**
     * AF(app, server) = A server using {app} to accept requests from {server}
     * 
     * Rep Invariant: None
     * 
     * SRE: all fields private and no methods return mutable fields
     */

    private readonly app;
    private server: Server | undefined;

    /**
     * Make a new web game server using board that listens for connections on port.
     * 
     * @param requestedPort server port number
     */
    public constructor(
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
        this.app.get('/puzzle/:filename', async(request, response) => {
            // select and load puzzle file per request
            const filename = request.params['filename'];
            const data = await fs.promises.readFile(`./puzzles/${filename}.starb`, 'utf-8');

            // remove stars from string to send blank puzzle string
            const dataLines = data.split(`\n`);
            let blankBoard = "";
            let first = true;

            // move "|" to beginning of each region, makign all squares empty
            for (const line of dataLines){
                if (line[0] !== "#" && line.length > 1){    // removes unnecessary comment lines
                    const newLine = (first) ? line :  " | " + line.replace("| ", "");
                    first = false;
                    blankBoard += newLine + "\n";
                }
            }
            console.log("Puzzle sent!");

            //send response
            response
            .status(StatusCodes.OK) // 200
            .type('text')
            .send(blankBoard);

            // close server after puzzle is sent
            // this.stop();
        });

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