const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const jwt = require('jsonwebtoken')
const MinhaSenha = 'ifrn2@23';


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fifa',
  });
  
  
  con.connect((erroConexao) => {
    if (erroConexao) {
      throw erroConexao;
    }
  });

router.post('/', (req, res) =>{
    const idUser = req.body.user;
    const pass = req.body.pass;
    const sql = 'SELECT * FROM Users WHERE userId  = ? AND pass = ?';
  
    con.query(sql, [idUser, pass], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      } else {
        if (result.length > 0) {
          //const nome = result[0].NoOperador;
          const token = jwt.sign({ idUser, pass }, MinhaSenha, {
            expiresIn: 60 * 10, // expires in 5min (300 segundos ==> 5 x 60)
          });
  
  
          res.json({ auth: true, token: token });
        } else {
          res.status(403).json({ message: 'Login inválido!'});
        }
      }
    });
  });

  

  module.exports = router;