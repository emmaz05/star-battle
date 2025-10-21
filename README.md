# Star Battle ⭐️⚔️

A client/server Star Battle puzzle system with a graphical user interface. This project allows users to solve 10×10 2-star puzzles with unique solutions, sent from a server to a client over HTTP. Users can interact with the puzzle via a web interface, adding and removing stars, and receiving feedback when the puzzle is solved.

---

## Project Highlights

- Client/server architecture for transmitting puzzles over the network
- Graphical interface for interactive puzzle solving
- Parser for reading provided Star Battle puzzle files
- Immutable puzzle ADT for representing puzzle states
- Manual and automated testing strategy
- Modular design for easy extension and iteration

---

## Learning Outcomes

- Practical experience with client/server systems
- Working knowledge of parsers and abstract data types (ADTs)
- Designing safe, modular, and extensible software
- Implementing and testing interactive graphical applications
- Collaborating effectively in a team environment

---

## Features

- Parse `.starb` puzzle files and blank puzzles from server
- Display puzzles on a web interface using HTML Canvas
- Add/remove stars via mouse interactions
- Validate puzzle completion
- Designed for 10×10 2-star puzzles with unique solutions

---

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/emmaz05/star-battle.git
cd starb
```
2. Run the server:

```bash
npm run server
```

3. Run the client in development mode:

```bash
npm run watch-client
```

4. Open starb-client.html in your browser to play the puzzle.

---

## Usage

- On startup, the client requests a blank puzzle from the server.
- Click on cells to add a star. Click again to remove it.
- The client tracks puzzle state and reports when the puzzle is solved.
- Supports modular extensions for hints, animations, and multiple puzzles.

---

## Credits

- Teammates: Diego Suarez and Samuel Manolis
- Project concept and Star Battle puzzle design by Hans Eendebak (2003)
- Web app examples and tutorials by Jim Bumgardner
- Course materials and guidance from the MIT 6.102 staff
- TypeScript and Node.js ecosystem for development tools
- ParserLib for puzzle parsing utilities

