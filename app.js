const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ticket_rs',
  password: 'qwerty',
  port: 5432,
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});




// Define a route to handle form submissions
app.post('/process_reservation', async (req, res) => {
  try {
    // Extract the query text and values from req.body

    // For demonstration purposes, let's log the received data
    console.log('Received reservation:');
    console.log(req.body);
    
    

    res.json({ message: 'Reservation processed successfully!' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/submit_booking', async (req, res) => {
  try {

    const name = req.body.name;
    const id = req.body.id; 
    // Extract the query text and values from req.body

    // For demonstration purposes, let's log the received data
    console.log('Received reservation:');
    console.log(req.body);

    const updateQuery = {
        text: 'update shows set available = available - 1 where id = $1',
          values: [id]  ,
           };
    client.query(updateQuery, (err, res) => {});

    const insertQuery = {
        text: 'INSERT INTO bookings ( show_id, customer_name) VALUES($1, $2)',
          values: [id, name]  ,
           };
    client.query(insertQuery, (err, res) => {});
    
    

    res.json({ message: 'Reservation processed successfully!' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/submit_cancellation', async (req, res) => {
  try {

    const id = parseInt(req.body.id); 

    // Extract the query text and values from req.body

    // For demonstration purposes, let's log the received data
    console.log('Received reservation:');
    console.log(req.body);
    console.log(id);

    const updateQuery = {
        text: 'update shows set available = available + 1 where id = (select show_id from bookings where id = $1)',
          values: [id]  ,
           };
    client.query(updateQuery, (err, res) => {});
    const deleteQuery = {
        text: 'delete from bookings where id = $1',
          values: [id]  ,
           };
    client.query(deleteQuery, (err, res) => {});
    
    

    res.json({ message: 'Reservation processed successfully!' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/submit_movie', async (req, res) => {
  try {

    const title = req.body.title;
    const duration = parseInt(req.body.duration_minutes);
    const rating = parseInt(req.body.rating);
    // Extract the query text and values from req.body

    // For demonstration purposes, let's log the received data
    console.log('Received reservation:');
    console.log(req.body);
    

    const insertQuery = {
        text: 'INSERT INTO movies ( title, duration_minutes, rating) VALUES($1, $2, $3)',
          values: [title, duration, rating]  ,
           };
    console.log(insertQuery);
    client.query(insertQuery, (err, res) => {});
    res.json({ message: 'Reservation processed successfully!' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/api/movies', async (req, res) => {
  try {
      const result = await client.query("select title,name,duration_minutes,rating,available,id from theaters natural join (select * from shows natural join movies)"); // Assuming 'movies' is your table
      res.json(result.rows);
  } catch(err) {
      res.status(500).send(err);
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
      const result = await client.query("SELECT * FROM bookings"); // Assuming 'movies' is your table
      res.json(result.rows);
  } catch(err) {
      res.status(500).send(err);
  }
});


