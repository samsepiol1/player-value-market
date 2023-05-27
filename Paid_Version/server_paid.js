const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const TokenMiddlware = require('./middleware/validarToken.middleware')
const rotaLogin = require('./routes/user.rota')


const app = express()
const port = 3000
app.use(express.json())
app.use(cors());
app.use('/login', rotaLogin)




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





    

  

  app.get('/player', TokenMiddlware, (req, res) => {
    con.query('SELECT * FROM Players', (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(200).send(result);
    });
  });


  app.get('/valor_mercado/:id', TokenMiddlware, (req, res) => {
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


  app.get('/jogador_performance/:id', TokenMiddlware, (req, res) => {
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

 


  app.post('/jogador_performance', TokenMiddlware, (req, res) => {
    const { player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual } = req.body;
    const sql = 'INSERT INTO JogadorPerformanceValor (player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, [player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao, valor_atual], (erroComandoSQL, result, fields) => {
      if (erroComandoSQL) {
        throw erroComandoSQL;
      }
      res.status(201).send('Informações de jogador_performance adicionadas com sucesso');
    });
  });


  
  app.put('/jogador_performance/:id', TokenMiddlware, (req, res) => {
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
app.delete('/jogador_performance/:id', TokenMiddlware, (req, res) => {
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
  
