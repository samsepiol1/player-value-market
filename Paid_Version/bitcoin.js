const bitcoin = require('bitcoinjs-lib@2.0.7');

// Cria uma nova carteira de teste
function criarCarteiraTeste() {
  // Gera um novo par de chaves (chave privada e chave pública)
  const keyPair = bitcoin.ECPair.makeRandom({ network: bitcoin.networks.testnet });

  // Obtém o endereço da carteira a partir da chave pública
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: bitcoin.networks.testnet });

  // Imprime as informações da carteira
  console.log('Chave privada:', keyPair.toWIF());
  console.log('Endereço da carteira:', address);
}

// Chama a função para criar uma nova carteira de teste
criarCarteiraTeste();