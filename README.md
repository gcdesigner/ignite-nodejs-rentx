**RF** => Requesitios Funcionais
(Requisitos relacionados as funcionalidades que o usuário poderá ter)

**RNF** => Requisitos não funcionais
(Requisitos que não estão ligados as regras da aplicação)

**RN** => Regra de negócio
(Requisitos relacionados as regras de fato - exceções, sucessos)

# Cadastro de carro

**RF**
[x] Deve ser possível cadastrar um novo carro
[x] Não deve ser possível cadastrar um carro sem categoria

**RN**
[x] Não deve ser possível cadastrar um carro com uma placa já existente
[x] Não deve ser possível alterar a placa de um carro já cadastrado
[x] O carro deve ser cadastrado sempre com disponibilidade.
[x] Somente um administrador pode cadastrar um carro

# Alterar carro

**RF**
[] Deve ser possível alterar o cadastro de um carro

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
[x] Deve ser possível alugar um carro

**RN**
[x] O aluguel deve ter duração mínima de 24 horas
[x] Não deve ser possível cadastrar um aluguel caso já tenha um aluguel em aberto;
[x] Não deve ser possível alugar um carro já alugado
[] Ao realizar um aluguel o carro deve ficar indisponível

# Devolução de carro

**RF**
[] Deve ser possível realizar a devolução de um carro

**RN**
[] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado uma diária completa
[] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
[] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
[] Ao realizar a devolução, deverá ser calculado o total do aluguel
[] Caso o horário da devolução seja superior ao horário previsto de entrega, deverá ser cobrado um multa proporcional ao dias de atraso
[] Caso haja multa, deverá ser somado ao total do aluguel
[] Usuário deve estar logado na aplicação

# Recuperar senha

**RF**
[] Deve ser possível o usuário recuperar a senha informando o e-mail
[] O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
[] O usuário deve conseguir inserir uma nova senha

**RN**
[] O usuário precisa informar uma nova senha
[] O link enviado para a recuperação deve expirar em 3 horas
