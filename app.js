require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(express.json());


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();  // Esta línea sincroniza los modelos con la base de datos.
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  app.use("/users", userRoutes)



  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running')
  })