import * as WebSocket from 'ws';

const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: Number(port) });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: WebSocket.Data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
