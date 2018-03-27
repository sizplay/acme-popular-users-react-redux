const express = require('express');
const app = express();
const path = require('path');

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next) => {
  Users.findAll()
  .then(users => res.send(users))
  .catch(next);
});

app.post('/api/users', (req, res, next) => {
  Users.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then( user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then( user => {
      return user.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}`));

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_popular_users_react_redux');

const Users = conn.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  popular: Sequelize.INTEGER
});

conn.sync({ force: true })
.then( ()=>{ Promise.all([
  Users.create({ name: 'Captain America', popular: 5 }),
  Users.create({ name: 'Iron Man', popular: 3 }),
  Users.create({ name: 'Black Widow', popular: 7 })
  ])
})
