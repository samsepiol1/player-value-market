create database fifa;
use fifa;

CREATE TABLE Players (
  player_id INT PRIMARY KEY,
  nome VARCHAR(100),
  data_nascimento DATE,
  nacionalidade VARCHAR(50),
  posicao VARCHAR(50),
  altura DECIMAL(4, 2),
  peso DECIMAL(5, 2),
  contrato_atual VARCHAR(100),
  salario_atual DECIMAL(10, 2)
);

CREATE TABLE Performance (
  performance_id INT PRIMARY KEY,
  player_id INT,
  gols_marcados INT,
  assistencias INT,
  jogos_disputados INT,
  minutos_jogados INT,
  chutes_a_gol INT,
  passes_completos INT,
  defesas INT,
  cartoes_amarelos INT,
  cartoes_vermelhos INT,
  FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

CREATE TABLE jogadorvalorhistorico (
  historico_id INT AUTO_INCREMENT PRIMARY KEY,
  player_id INT,
  tabela_origem VARCHAR(100),
  campo_modificado VARCHAR(100),
  valor_antigo VARCHAR(255),
  valor_novo VARCHAR(255),
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES Players (player_id)
);


INSERT INTO Players (player_id, nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual)
VALUES (1, 'Cristiano Ronaldo', '1985-02-05', 'Portugal', 'Atacante', 1.87, 83.5, '2023-2025', 5000000.00);

INSERT INTO Players (player_id, nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual)
VALUES (2, 'Lionel Messi', '1987-06-24', 'Argentina', 'Meio-Campista', 1.70, 72.0, '2022-2024', 4500000.00);


SELECT * FROM players where player_id = 1;

SELECT * FROM players;

INSERT INTO Players (nome, data_nascimento, nacionalidade, posicao, altura, peso, contrato_atual, salario_atual)
VALUES ('Neymar Jr.', '1992-02-05', 'Brasil', 'Atacante', 175, 68, '2025-06-30', 800000);

INSERT INTO Performance (performance_id, player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos)
VALUES (1, 1, 10, 5, 20, 1800, 30, 500, 0, 2, 0);

INSERT INTO Performance (performance_id, player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos)
VALUES (2, 2, 5, 5, 20, 1800, 30, 500, 0, 2, 0);

INSERT INTO Transferencias (transferencia_id, player_id, clube_anterior, valor_transferencia)
VALUES (1, 1, 'Clube A', 10000000);

INSERT INTO Transferencias (transferencia_id, player_id, clube_anterior, valor_transferencia)
VALUES (2, 2, 'Clube B', 15000000);

INSERT INTO ValorMercado (valor_id, player_id, data_atualizacao, valor_atual)
VALUES (1, 1, '2023-01-01', 12000000);

INSERT INTO ValorMercado (valor_id, player_id, data_atualizacao, valor_atual)
VALUES (2, 2, '2023-01-01', 18000000);

INSERT INTO Lesoes (lesao_id, player_id, descricao, duracao, gravidade)
VALUES (1, 1, 'Lesão no tornozelo', 30, 'Média');

INSERT INTO Lesoes (lesao_id, player_id, descricao, duracao, gravidade)
VALUES (2, 2, 'Lesão na coxa', 45, 'Alta');

CREATE TABLE Transferencias (
  transferencia_id INT PRIMARY KEY,
  player_id INT,
  clube_anterior VARCHAR(255),
  valor_transferencia DECIMAL(10, 2),
  FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

CREATE TABLE Lesoes (
  lesao_id INT PRIMARY KEY,
  player_id INT,
  descricao VARCHAR(255),
  duracao INT,
  gravidade VARCHAR(50),
  FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

CREATE TABLE ValorMercado (
  valor_id INT PRIMARY KEY,
  player_id INT,
  data_atualizacao DATE,
  valor_atual DECIMAL(10, 2),
  FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

SELECT * FROM Performance;


CREATE VIEW JogadorPerformanceValor AS
SELECT p.nome, perf.*
FROM Players p
JOIN Performance perf ON p.player_id = perf.player_id
JOIN ValorMercado vm ON p.player_id = vm.player_id;

CREATE VIEW JogadorPerformanceValor AS
SELECT p.nome, p.posicao, p.altura, p.nacionalidade, perf.*
FROM Players p
JOIN Performance perf ON p.player_id = perf.player_id
JOIN ValorMercado vm ON p.player_id = vm.player_id;

drop view  JogadorPerformanceValor;

SELECT * from JogadorPerformanceValor;

CREATE OR REPLACE VIEW JogadorPerformanceValor AS
SELECT p.nome, p.posicao, p.altura, p.nacionalidade, perf.*, vm.valor_atual, vm.data_atualizacao
FROM Players p
JOIN Performance perf ON p.player_id = perf.player_id
JOIN ValorMercado vm ON p.player_id = vm.player_id;



CREATE OR REPLACE VIEW JogadorPerformanceValor AS
SELECT p.nome, p.posicao, p.altura, p.nacionalidade, perf.*, vm.valor_atual, vm.data_atualizacao_valor_mercado
FROM Players p
JOIN Performance perf ON p.player_id = perf.player_id
JOIN ValorMercado vm ON p.player_id = vm.player_id;


ALTER TABLE ValorMercado ADD COLUMN data_atualizacao_valor_mercado DATETIME;



CREATE TABLE Temp_JogadorPerformanceValor AS
SELECT * FROM JogadorPerformanceValor;

DELETE FROM Temp_JogadorPerformanceValor
WHERE performance_id NOT IN (
  SELECT MIN(performance_id)
  FROM Temp_JogadorPerformanceValor
  GROUP BY player_id
);

SELECT * FROM players;
SELECT * FROM performance;



CREATE VIEW JogadorPerformanceValor AS
SELECT * FROM Temp_JogadorPerformanceValor;

SELECT * FROM JogadorPerformanceValor_Historico;

SELECT * FROM performance;

SELECT * FROM JogadorPerformanceValor;

DROP VIEW JogadorPerformanceValor;

 DELETE FROM jogadorPerformanceValor
 WHERE player_id = 1; 


select *from jogadorperformancevalor;

show tables;

select *from jogadorperformancevalor_historico;


DELIMITER //
CREATE TRIGGER tr_JogadorPerformanceValorUpdate
BEFORE UPDATE ON Performance
FOR EACH ROW
BEGIN
  INSERT INTO JogadorPerformanceValor_Historico
    (nome, posicao, altura, nacionalidade, performance_id, player_id, gols_marcados, assistencias, jogos_disputados, minutos_jogados, chutes_a_gol, passes_completos, defesas, cartoes_amarelos, cartoes_vermelhos, data_atualizacao)
  SELECT
    p.nome, p.posicao, p.altura, p.nacionalidade, perf.performance_id, perf.player_id, perf.gols_marcados, perf.assistencias, perf.jogos_disputados, perf.minutos_jogados, perf.chutes_a_gol, perf.passes_completos, perf.defesas, perf.cartoes_amarelos, perf.cartoes_vermelhos, NOW()
  FROM
    Players p
  JOIN
    Performance perf ON p.player_id = perf.player_id
  WHERE
    perf.performance_id = OLD.performance_id;
END //
DELIMITER ;

DROP TRIGGER IF EXISTS tr_JogadorPerformanceValorUpdate;

DROP TRIGGER IF EXISTS atualizar_jogadorvalorhistorico_performance;
DROP TRIGGER IF EXISTS atualizar_jogadorvalorhistorico_valormercado;


-- Trigger para a tabela 'Players'
DELIMITER //

CREATE TRIGGER after_update_players
AFTER UPDATE ON Players
FOR EACH ROW
BEGIN
  -- Inserir registro na tabela 'jogadorvalorhistorico' com os valores antigos
  INSERT INTO jogadorvalorhistorico (player_id, tabela_origem, campo_modificado, valor_antigo)
  VALUES (OLD.player_id, 'Players', 'nome', OLD.nome),
         (OLD.player_id, 'Players', 'data_nascimento', OLD.data_nascimento);
         -- Repita o processo para as demais colunas que deseja armazenar

  -- Inserir registro na tabela 'jogadorvalorhistorico' com os valores atualizados
  INSERT INTO jogadorvalorhistorico (player_id, tabela_origem, campo_modificado, valor_novo)
  VALUES (NEW.player_id, 'Players', 'nome', NEW.nome),
         (NEW.player_id, 'Players', 'data_nascimento', NEW.data_nascimento);
         -- Repita o processo para as demais colunas atualizadas
END //

-- Trigger para a tabela 'Performance'
CREATE TRIGGER after_update_performance
AFTER UPDATE ON Performance
FOR EACH ROW
BEGIN
  -- Inserir registro na tabela 'jogadorvalorhistorico' com os valores antigos
  INSERT INTO jogadorvalorhistorico (player_id, tabela_origem, campo_modificado, valor_antigo)
  VALUES (OLD.player_id, 'Performance', 'gols_marcados', OLD.gols_marcados),
         (OLD.player_id, 'Performance', 'assistencias', OLD.assistencias);
         -- Repita o processo para as demais colunas que deseja armazenar

  -- Inserir registro na tabela 'jogadorvalorhistorico' com os valores atualizados
  INSERT INTO jogadorvalorhistorico (player_id, tabela_origem, campo_modificado, valor_novo)
  VALUES (NEW.player_id, 'Performance', 'gols_marcados', NEW.gols_marcados),
         (NEW.player_id, 'Performance', 'assistencias', NEW.assistencias);
         -- Repita o processo para as demais colunas atualizadas
END //

-- Trigger para a tabela 'ValorMercado'
CREATE TRIGGER after_update_valor_mercado
AFTER UPDATE ON ValorMercado
FOR EACH ROW
BEGIN
  -- Inserir registro na tabela 'jogadorvalorhistorico' com os valores antigos
  INSERT INTO jogadorvalorhistorico (player_id, tabela_origem, campo_modificado, valor_antigo)
  VALUES (OLD.player_id, 'ValorMercado', 'valor_atual', OLD.valor_atual);
         -- Repita o processo para as demais colunas que deseja armazenar

  -- Inserir registro na tabela 'jogadorvalorhistorico' com os valores atualizados
  INSERT INTO jogadorvalorhistorico (player_id, tabela_origem, campo_modificado, valor_novo)
  VALUES (NEW.player_id, 'ValorMercado', 'valor_atual', NEW.valor_atual);
         -- Repita o processo para as demais colunas atualizadas
END //

DELIMITER ;

select * from jogadorvalorhistorico;

CREATE VIEW jogadorvalorhistorico_view AS
SELECT jvh.player_id, jvh.tabela_origem, jvh.campo_modificado,
       antigo.valor AS valor_antigo, novo.valor AS valor_novo
FROM jogadorvalorhistorico jvh
LEFT JOIN (
    SELECT player_id, tabela_origem, campo_modificado, valor_novo AS valor
    FROM jogadorvalorhistorico
    WHERE valor_antigo IS NULL
) antigo ON antigo.player_id = jvh.player_id
          AND antigo.tabela_origem = jvh.tabela_origem
          AND antigo.campo_modificado = jvh.campo_modificado
LEFT JOIN (
    SELECT player_id, tabela_origem, campo_modificado, valor_antigo AS valor
    FROM jogadorvalorhistorico
    WHERE valor_novo IS NULL
) novo ON novo.player_id = jvh.player_id
         AND novo.tabela_origem = jvh.tabela_origem
         AND novo.campo_modificado = jvh.campo_modificado
ORDER BY jvh.player_id, jvh.tabela_origem, jvh.campo_modificado;

SELECT * FROM jogadorvalorhistorico_view;


CREATE VIEW jogadorvalorhistorico2_view AS
SELECT jvh.player_id, jvh.tabela_origem, jvh.campo_modificado,
       antigo.valor AS valor_antigo, novo.valor AS valor_novo
FROM jogadorvalorhistorico jvh
LEFT JOIN (
    SELECT player_id, tabela_origem, campo_modificado, valor_novo AS valor, MAX(data_atualizacao) AS max_data
    FROM jogadorvalorhistorico
    WHERE valor_antigo IS NULL
    GROUP BY player_id, tabela_origem, campo_modificado
) antigo ON antigo.player_id = jvh.player_id
          AND antigo.tabela_origem = jvh.tabela_origem
          AND antigo.campo_modificado = jvh.campo_modificado
          AND antigo.max_data = jvh.data_atualizacao
LEFT JOIN (
    SELECT player_id, tabela_origem, campo_modificado, valor_antigo AS valor, MAX(data_atualizacao) AS max_data
    FROM jogadorvalorhistorico
    WHERE valor_novo IS NULL
    GROUP BY player_id, tabela_origem, campo_modificado
) novo ON novo.player_id = jvh.player_id
         AND novo.tabela_origem = jvh.tabela_origem
         AND novo.campo_modificado = jvh.campo_modificado
         AND novo.max_data = jvh.data_atualizacao
ORDER BY jvh.player_id, jvh.tabela_origem, jvh.campo_modificado;

SELECT * FROM jogadorvalorhistorico2_view;

SELECT jvh.player_id, jvh.tabela_origem, jvh.campo_modificado,
       antigo.valor_antigo AS valor_antigo, novo.valor_novo AS valor_novo
FROM jogadorvalorhistorico jvh
INNER JOIN (
    SELECT player_id, tabela_origem, campo_modificado, MAX(data_atualizacao) AS max_data_antigo
    FROM jogadorvalorhistorico
    WHERE valor_antigo IS NOT NULL
    GROUP BY player_id, tabela_origem, campo_modificado
) max_antigo ON max_antigo.player_id = jvh.player_id
               AND max_antigo.tabela_origem = jvh.tabela_origem
               AND max_antigo.campo_modificado = jvh.campo_modificado
               AND max_antigo.max_data_antigo = jvh.data_atualizacao
INNER JOIN (
    SELECT player_id, tabela_origem, campo_modificado, MAX(data_atualizacao) AS max_data_novo
    FROM jogadorvalorhistorico
    WHERE valor_novo IS NOT NULL
    GROUP BY player_id, tabela_origem, campo_modificado
) max_novo ON max_novo.player_id = jvh.player_id
             AND max_novo.tabela_origem = jvh.tabela_origem
             AND max_novo.campo_modificado = jvh.campo_modificado
             AND max_novo.max_data_novo = jvh.data_atualizacao
INNER JOIN jogadorvalorhistorico antigo ON antigo.player_id = jvh.player_id
                                          AND antigo.tabela_origem = jvh.tabela_origem
                                          AND antigo.campo_modificado = jvh.campo_modificado
                                          AND antigo.valor_antigo IS NOT NULL
INNER JOIN jogadorvalorhistorico novo ON novo.player_id = jvh.player_id
                                        AND novo.tabela_origem = jvh.tabela_origem
                                        AND novo.campo_modificado = jvh.campo_modificado
                                        AND novo.valor_novo IS NOT NULL
ORDER BY jvh.player_id, jvh.tabela_origem, jvh.campo_modificado;









