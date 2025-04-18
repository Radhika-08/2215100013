import express from 'express';
import cors from 'cors';

const app = express();
const port = 9876;

app.use(cors());

// Generate Fibonacci number at position n
function getFibonacci(n) {
    if (n <= 1) return n;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

// Get square of position n
function getSquare(n) {
    return n * n;
}

// Get random number between 1 and 100
function getRandom() {
    return Math.floor(Math.random() * 100) + 1;
}

let position = 0;

app.get('/numbers/:type', (req, res) => {
    const type = req.params.type.toUpperCase();
    let number;

    switch (type) {
        case 'F':
            number = getFibonacci(position);
            break;
        case 'S':
            number = getSquare(position);
            break;
        case 'R':
            number = getRandom();
            break;
        default:
            return res.status(400).json({ error: 'Invalid number type' });
    }

    if (type !== 'R') position++;

    res.json({ number });
});

app.listen(port, () => {
    console.log(`Test server running at http://localhost:${port}`);
});
