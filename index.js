
const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')

const app = express()
const port = 3000
app.use(express.json())

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



app.post('/login', (req, res) => {

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


app.get('/player', verificarToken, (req, res) => {
  con.query('SELECT * FROM Players', (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }
    res.status(200).send(result);
  });
});






// Metodo GET - todas as informações do jogador
app.get('/player/:id', (req, res) => {
  const idPlayer = req.params.id;
  const sql = 'SELECT * FROM Players WHERE player_id = ?';
  con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }

    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Não encontrado');
    }
  });
});




// POST - Adicionar um novo jogador
app.post('/player', (req, res) => {
    const { nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual } = req.body;
    const sql = 'INSERT INTO Players (nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(201).send('Jogador adicionado com sucesso');
    });
  });


// PUT - Atualizar informações de um jogador
app.put('/player/:id', (req, res) => {
    const idPlayer = req.params.id;
    const { nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual } = req.body;
    const sql = 'UPDATE Players SET nome = ?, data_nascimento = ?, nacionalidade = ?, posicao = ?, altura = ?, peso = ?, contrato_atual = ?, salario_atual = ? WHERE player_id = ?';
    con.query(sql, [nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual, idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(200).send('Informações do jogador atualizadas com sucesso');
    });
  });

  // DELETE - Remover um jogador
  app.delete('/player/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'DELETE FROM Players WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(200).send('Jogador removido com sucesso');
    });
  });



  app.get('/performance/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'SELECT * FROM Performance WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
  
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Não encontrado');
      }
    });
  });


  // POST - Adicionar informações de performance para um jogador
    app.post('/performance', (req, res) => {
    const { player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos } = req.body;
    const sql = 'INSERT INTO Performance (player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos], (erroComandoSQL, result, fields) => {
        if (erroComandoSQL) {
        throw erroComandoSQL;
        }
        res.status(201).send('Informações de performance adicionadas com sucesso');
    });
    });

    // PUT - Atualizar informações de performance de um jogador
    app.put('/performance/:id', (req, res) => {
    const idPlayer = req.params.id;
    const { gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos } = req.body;
    const sql = 'UPDATE Performance SET gols_marcados = ?, assistencias = ?, jogos_disputados = ?, minutos_jogados = ?, chutes_a_gol = ?, passes_completos = ?, defesas = ?, cartoes_amarelos = ?, cartoes_vermelhos = ? WHERE player_id = ?';
    con.query(sql, [gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, idPlayer], (erroComandoSQL, result, fields) => {
        if (erroComandoSQL) {
        throw erroComandoSQL;
        }
        res.status(200).send('Informações de performance do jogador atualizadas com sucesso');
    });
    });

    // DELETE - Deletar informações de performance de um jogador
    app.delete('/performance/:id', (req, res) => {
        const idPlayer = req.params.id;
        const sql = 'DELETE FROM Performance WHERE player_id = ?';
        con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
          if (erroComandoSQL) {
            throw erroComandoSQL;
          }
          res.status(200).send('Informações de performance do jogador removidas com sucesso');
        });
      });


  


  app.get('/lesoes/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'SELECT * FROM Lesoes WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
  
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Não encontrado');
      }
    });
  });


  app.get('/transferencias/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'SELECT * FROM Transferencias WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
  
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Não encontrado');
      }
    });
  });


  app.get('/valor_mercado/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'SELECT * FROM valorMercado WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
  
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Não encontrado');
      }
    });
  });


  app.get('/jogador_performance/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'SELECT * FROM JogadorPerformanceValor WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
  
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Não encontrado');
      }
    });
  });

 


  app.post('/jogador_performance', (req, res) => {
    const { player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual } = req.body;
    const sql = 'INSERT INTO JogadorPerformanceValor (player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(201).send('Informações de jogador_performance adicionadas com sucesso');
    });
  });


  
  app.put('/jogador_performance/:id', (req, res) => {
    const idPlayer = req.params.id;
    const { nome, posicao, altura, salario_atual, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual } = req.body;
  
    // Atualizar tabela Players
    const sqlPlayers = 'UPDATE Players SET nome = ?, posicao = ?, altura = ?, salario_atual = ? WHERE player_id = ?';
    con.query(sqlPlayers, [nome, posicao, altura, salario_atual, idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
    });
  
    // Atualizar tabela Performance
    const sqlPerformance = 'UPDATE Performance SET gols_marcados = ?, assistencias = ?, jogos_disputados = ?, minutos_jogados = ?, chutes_a_gol = ?, passes_completos = ?, defesas = ?, cartoes_amarelos = ?, cartoes_vermelhos = ? WHERE player_id = ?';
    con.query(sqlPerformance, [gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
    });
  
    // Atualizar tabela ValorMercado
    const sqlValorMercado = 'UPDATE ValorMercado SET valor_atual = ? WHERE player_id = ?';
    con.query(sqlValorMercado, [valor_atual, idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
    });
  
    res.status(200).send('Informações de jogador_performance do jogador atualizadas com sucesso');
  });
  // DELETE - Remover informações de jogador_performance de um jogador
app.delete('/jogador_performance/:id', (req, res) => {
    const idPlayer = req.params.id;
    const sql = 'DELETE FROM JogadorPerformanceValor WHERE player_id = ?';
    con.query(sql, [idPlayer], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
    
      if (result.affectedRows > 0) {
        res.status(200).send('Informações de jogador_performance do jogador removidas com sucesso');
      } else {
        res.status(404).send('Jogador não encontrado');
      }
    });
  });











app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
