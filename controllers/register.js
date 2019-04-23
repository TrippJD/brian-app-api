const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("Incorrect from submission");
  }
  const hash = bcrypt.hashSync(password, 10);
  db.transaction(trx => {
    trx("login")
      .insert(
        {
          hash,
          email,
        },
        "email"
      )
      .then(loginEmail => {
        return trx("users")
          .insert(
            {
              email: loginEmail[0],
              name,
              joined: new Date(),
            },
            "*"
          )
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(() => res.status(400).json("Unable to register"));
};

module.exports = { handleRegister };
