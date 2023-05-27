const MinhaSenha = 'ifrn2@23';
const jwt = require('jsonwebtoken')

function verificarToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(401).json({
        auth: false,
        message: 'Nenhum token de autenticação informado.',
      });
    } else {
      jwt.verify(token, MinhaSenha, function (err, decoded) {
        if (err) {
          res.status(500).json({ auth: false, message: 'Token inválido.' });
        } else {
          console.log('Metodo acessado por ' + decoded.nome);
          next();
        }
      });
    }
  }

module.exports = verificarToken