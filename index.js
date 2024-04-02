const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // URI de conexão com o seu banco de dados MongoDB
const dbName = 'cadastro-clientes'; // Nome do seu banco de dados MongoDB
const collectionName = 'clientes'; // Nome da coleção onde os clientes serão armazenados

async function cadastrarCliente() {
    const nomeCliente = prompt("Insira o nome do cliente:");
    const cpfCliente = prompt("Insira o CPF do cliente:");
    const telefoneCliente = prompt("Insira o telefone do cliente:");
    const emailCliente = prompt("Insira o email do cliente:");
    const enderecoCliente = prompt("Insira o endereço do cliente:");
    const avaliacaoCliente = prompt("Insira uma avaliação para o cliente");

    const cliente = {
        nome: nomeCliente,
        cpf: cpfCliente,
        telefone: telefoneCliente,
        email: emailCliente,
        endereco: enderecoCliente,
        avaliacao: avaliacaoCliente
    };

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(cliente);
        console.log(`Cliente cadastrado com o ID: ${result.insertedId}`);

        // Após cadastrar o cliente, retorna a lista atualizada de clientes
        await retornarClientes();
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
    } finally {
        await client.close();
    }
}

async function retornarClientes() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        
        // Consulta todos os clientes na coleção
        const clientes = await collection.find().toArray();

        // Exibir os clientes em formato de tabela
        console.table(clientes);
    } catch (error) {
        console.error("Erro ao retornar clientes:", error);
    } finally {
        await client.close();
    }
}

// Exemplo de uso:
cadastrarCliente();


