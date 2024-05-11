//App en ES5 en
const {
    connectDB
} = require('./mongoose');
const app = require('./appFacebook');

async function main() {
    const db = await connectDB();

    const PORT = process.env.PORT || 3000;

    const server = app.listen(PORT, () => {
        console.log(`Server trabajando en http://localhost:${PORT}`);
    })

    server.on('error', (error) => {
        console.log(`Error en servidor ${error}`);
    })
}

main();