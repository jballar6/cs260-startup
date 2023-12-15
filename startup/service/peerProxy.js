const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message: ${message}`);
    
    // Parse the incoming message
    const msg = JSON.parse(message);

    // Prepare a response
    let response;
    if (msg.type === 'Success') {
      response = { type: 'Success', message: 'Workout logged successfully!' };
    } else if (msg.type === 'Failure') {
      response = { type: 'Failure', message: 'Failed to save workout. Try again' };
    }

    // Send the response
    ws.send(JSON.stringify(response));
    });
    });
}

module.exports = { peerProxy };
