**RF** => Requesitios Funcionais
(Requisitos relacionados as funcionalidades que o usuário poderá ter)

**RNF** => Requisitos não funcionais
(Requisitos que não estão ligados as regras da aplicação)

**RN** => Regra de negócio
(Requisitos relacionados as regras de fato - exceções, sucessos)

---

# Cadastro de carro

**RF**
[] Deve ser possível cadastrar um novo carro
[] Não deve ser possível cadastrar um carro sem categoria

**RN**
[] Não deve ser possível cadastrar um carro com uma placa já existente
[] Não deve ser possível alterar a placa de um carro já cadastrado
[] O carro deve ser cadastrado sempre com disponibilidade.

- [] Somente um administrador pode cadastrar um carro

# Alterar carro

**RF**
[] Deve ser possível alterar o cadsatro de um carro

**RN**
[] Não deve ser possível alterar a placa de um carro já cadastrado
[] Somente um administrador pode cadastrar um carro

# Listagem de carros

**RF**
[] Deve ser possível listar todos os carros disponíveis
[] Deve ser possível listar todos os carros pela categoria
[] Deve ser possível listar todos os carros pela marca
[] Deve ser possível listar todos os carros pelo nome do carro

**RN**
[] Deve ser possível listar os carros mesmo sem estar logado no sistema

# Cadastro de especificação no carro

**RF**
[] Deve ser possível cadastrar uma especificação para o carro
[] Deve ser possível listar todas as especificações
[]

**RN**
[] Não deve ser possível cadastrar uma especificação para um carro inesistênte
[] Somente usuários administradores podem cadastrar especificações
[] Deve ser possível cadastrar várias especificações para um mesmo carro
[] Não deve ser possível cadastrar especificações duplicadas pra o mesmo carro

# Cadastro de imagens do carro

**RF**
[] Deve ser possível cadastrar a imagem do carro
[] Deve ser possível listar todas os carros

**RNF**
[] Utilizar o multer para upload dos arquivos
[] Salvar as imagens do store da aws

**RN**
[] Deve ser possível cadastrar mais de uma imagem por carro
[] Somente um administrador pode cadastrar imagens

# Aluguel de carro

**RF**
[] Deve ser possível alugar um carro

**RN**
[] O aluguel deve ter duração mínima de 24 horas
[] Não deve ser possível cadastrar um aluguel caso já tenha um aluguel em aberto;
[] Não deve ser possível alugar um carro já alugado
