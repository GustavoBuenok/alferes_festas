use "cadastro-clientes"

db.createCollection ("clientes", 
    {
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["nome", "cpf", "email", "telefone", "endereco"],
                properties:{
                    nome:{
                        bsonType:"string",
                        description: "Informe corretamente o nome do cliente"
                    },
                    cpf:{
                        bsonType:"string",
                        description:"Informe corretamente o CPF do cliente"
                    },
                    email:{
                        bsonType:"string",
                        description:"Informe corretamente o email do cliente"
                    },
                    telefone:{
                        bsonType:"string",
                        description:"Informe corretamente o telefone do cliente"
                },
                    endereco:{
                        bsonType:"string",
                        description:"Informe corretamente o endereço do cliente"
                    }
            }
        }
    }
    
)

db.clientes.updateMany({}, { $set: { avaliacao: {} } })

db.runCommand({
  collMod: "clientes",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["avaliacao"],
    },
  },
})

db.clientes.insertOne({"nome":"Gustavo Bueno",
    "cpf": "51966880804",
    "email": "gustavobuenok@gmail.com",
    "telefone": "11 956968122",
    "endereco": "Rua Alessandro Allori, 446 - Apto 10 - Vila Maria Luisa",
    "avaliacao": "Otimo cliente"
})

db.getCollectionInfos({name:"clientes"})

db.clientes.find()
