# Phone Camera PC - Online / Render Ready

This project lets a PC browser control a phone camera through Socket.IO.

## Multi-PC / Multi-phone

Each PC automatically gets a Room Code.

1. Open `/pc.html` on the PC.
2. Note the Room Code shown on screen.
3. Open `/phone.html` on the phone.
4. Enter the same Room Code.
5. Press Capture on the PC.

Only the phone using that Room Code receives the capture request.

## Render deployment

Build command:
`npm install`

Start command:
`npm start`

The server automatically uses Render's `PORT` environment variable.

After deployment, use the HTTPS Render URL:
- PC: `https://YOUR-APP.onrender.com/pc.html`
- Phone: `https://YOUR-APP.onrender.com/phone.html`

## Important

The camera requires HTTPS in normal mobile browsers, so use the HTTPS Render URL.

WhatsApp Web automation is not performed by the cloud server. The captured photo can be saved/downloaded on the PC, and any Windows-side WhatsApp automation must run on that PC.
