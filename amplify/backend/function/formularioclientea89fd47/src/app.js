

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const aws = require('aws-sdk');
const { Client } = require('pg');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * Example get method *
 **********************/


app.get('/form/list', async function (req, res) {
  try {

    const client = await obtenerSecretosStartDB(); // Obtenemos Secretos e Instaciamos Client DB

    await client.connect(); // Conect DB

    const query = 'SELECT * FROM formulario';

    const result = await client.query(query); // Query

    await client.end(); // Close DB
    console.log('Desconexión exitosa de la base de datos');

    res.json(result); // respuesta


  } catch (error) {
    console.error('Error al leer los registros:', error);
    res.status(500).send('Error del servidor . read form');
  }

});

/****************************
* Example post method *
****************************/

app.post('/form/create', async function (req, res) {
  try {
    const client = await obtenerSecretosStartDB();

    await client.connect(); // Conect DB
    console.log('conexión exitosa de la base de datos');

    const { id, nombre_completo, pais, ciudad } = req.body;

    const query = 'INSERT INTO public.formulario(id, nombre_completo, pais, ciudad)  VALUES ( $1, $2, $3, $4)';
    const values = [id, nombre_completo, pais, ciudad];


    await client.query(query, values); // query db


    await client.end(); // close db
    console.log('Desconexión exitosa de la base de datos');

    res.sendStatus(201); // respuesta

  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).send('Error del servidor. create form');
  }
});



/****************************
* Example put method *
****************************/

app.put('/form/update', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});



/****************************
* Example delete method *
****************************/

app.delete('/form/delete', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});


app.listen(3000, function () {
  console.log("App started")
});




async function obtenerSecretosStartDB() {
  try {
    const { Parameters } = await (new aws.SSM())
      .getParameters({
        Names: ["USER", "HOST", "DATABASE", "PASSWORD", "PORT"].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();


    const secretos = Parameters.reduce((resultado, parametro) => {
      const nombreLimpio = parametro.Name.replace('/amplify/d1r73gegjsarun/dev/AMPLIFY_formularioclientea89fd47_', '');
      resultado[nombreLimpio] = parametro.Value;
      return resultado;
    }, {});

    //Iniciamos Client DB

    const client = new Client({
      user: secretos['USER'],
      host: secretos['HOST'],
      database: secretos['DATABASE'],
      password: secretos['PASSWORD'],
      port: parseInt(secretos['PORT'])
    });

    return client


  } catch (error) {
    console.error('Error:', error);
  }
}


// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
