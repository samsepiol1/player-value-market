const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

//const jwt = require('jsonwebtoken')

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())





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












// Metodo GET - todas as informações do jogador com id especifico

app.get('/player', (req, res) => {
  con.query('SELECT * FROM Players', (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }
    res.status(200).send(result);
  });
});


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


  // GET - Exibir Informações de performance
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


 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
