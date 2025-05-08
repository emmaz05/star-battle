
// /**
//  * Main function that should be called to start the server. This should take in a port
//  * and a filename from the command-line to load up a relevant puzzle using the specified port.
//  */
// async function main(): Promise<void> {
//     throw new Error("Implement me!");
// }

// /**
//  * Class used to represent the WebServer, which is immutable.
//  */
// class WebServer {
//     // Abstraction Function:
//     //  AF(server, app, puzzle, requestedPort): the webserver running on
//     //      server server through port requestPort that allows the client
//     //      to play with the puzzle puzzle
//     // Representation Invariant:
//     //  FILL ME
//     // Safety from Representation Exposure:
//     //  FILL ME 

//     private readonly app: Application;
//     private server: Server|undefined;

//     /**
//      * Create a new web server game using the given puzzle
//      * 
//      * @param puzzle the puzzle to use in the server
//      * @param requestedPort the port number rquested for use
//      */
//     public constructor(
//         private readonly puzzle: Puzzle,
//         private readonly requestedPort: number
//     ) {
//         throw new Error("Implement me!");
//     }

//     /**
//      * Check the representations invariant
//      */
//     private checkRep() {
//         throw new Error("Implement me!");
//     }

//     /**
//      * Start this server.
//      * 
//      * @returns (a promise that) resolves when the server is listening
//      */
//     public start(): Promise<void> {
//         throw new Error("Implement me!");
//     }


//     /**
//      * Gets the current port of this server.
//      * 
//      * @returns the actual port that server is listening at. 
//      * MAY NOT BE this.requestedPort* 
//      */
//     public get port(): number {
//         throw new Error("Implement me!");
//     }

//     /**
//      * Stop this server.
//      */
//     public stop(): void {
//         throw new Error("Implement me!");
//     }
// }


// =====================================
// ========= CODE TO REFERENCE =========
// =====================================

// Here is some code that may be useful for the implementation, take from
// Problem Set 4

import assert from 'node:assert';
import process from 'node:process';
import { Server } from 'node:http';
import express, { Application } from 'express';
import { StatusCodes }  from 'http-status-codes';
// import { Board } from './board.js';
// import { look, flip, map, watch } from './commands.js';



/**
 * Start a game server using the given arguments
 * 
 * Command-line usage:
 *     npm start PORT FILENAME
 * where:
 * 
 *   - PORT is an integer that specifies the server's listening port number,
 *     0 specifies that a random unused port will be automatically chosen.
 *   - FILENAME is the path to a valid board file, which will be loaded as
 *     the starting game board.
 * 
 * For example, to start a web server on a randomly-chosen port using the
 * board in `boards/hearts.txt`:
 *     npm start 0 boards/hearts.txt
 * 
 * @throws Error if an error occurs parsing a file or starting a server
 */
async function main(): Promise<void> {
    // const [portString, filename] 
    //     = process.argv.slice(2); // skip the first two arguments 
    //                              // (argv[0] is node executable file, argv[1] is this script)
    // if (portString === undefined) { throw new Error('missing PORT'); }
    // const port = parseInt(portString);
    // if (isNaN(port) || port < 0) { throw new Error('invalid PORT'); }
    // if (filename === undefined) { throw new Error('missing FILENAME'); }
    
    // const board = await Board.parseFromFile(filename);
    const server = new WebServer(board, port);
    await server.start();
}


/**
 * HTTP web game server.
 */
class WebServer {

    private readonly app: Application;
    private server: Server|undefined;

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

            const puzzle = "ada";
            response
            .status(StatusCodes.OK) // 200
            .type('text')
            .send(puzzle);
        });
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
