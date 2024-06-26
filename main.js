// Crear un servidor con Express en el puerto 3000
const express = require("express");
const app = express();

// Definir la carpeta "assets" como carpeta pública del servidor
app.use(express.static("assets"));

//3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios. (2 Puntos) 

const usuarios = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
]

app.get("/abracadabra/usuarios", (req, res) => {
    res.send({ usuarios })
});

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”. (2 Puntos) 

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    usuarios.includes(req.params.usuario) ? next() : res.redirect('/who.jpeg');
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort. (2 Puntos) 

app.get('/abracadabra/conejo/:n', (req, res) => {
    // Paso 2
    const numeroRandom = Math.floor(Math.random() * (5 - 1)) + 1;
    // Paso 3
    const n = req.params.n;
    // Paso 3
    n == numeroRandom
        ? res.redirect('/conejito.jpg')
        : res.redirect('/voldemort.jpg');
});

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor. (1 Punto) 

app.get('*', (req, res) => {
    res.send('Esta página no existe... ')
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
