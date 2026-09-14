const http = require('http');

const data = JSON.stringify({
  moviename: "Avatar: The Way of Water",
  theatre: "PVR Cinemas, Grand Mall",
  showTime: "07:30 PM",
  seats: ["A1", "A2"],
  totalAmount: 300,
  date: "2026-09-12T20:30:00.000Z",
  customerName: "Alex Mercer"
});

const req = http.request({
  hostname: 'localhost',
  port: 8080,
  path: '/tickets/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('RESPONSE:', body);
  });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
