## 🚀 Adresses frontend
Objetivos deste projeto:

1 - Demonstração básica do uso de VUE3 como normalmente programo um sistema mais ou menos, porém de forma básica sem routeguard, sessão de usuario entre outros recursos mais

2 - Criei uma aplicação onde o usuario pode cadastar um novo endereço digitando seu cep, consumindo os dados automaticos do viacep e posteriormente enviando estes dados para o backend, também há uma pequena parte onde consumo os logs de erros e informações decorridas no sistema durante seu uso, o sistema possui filtros, paginação, export de dados para excel e etc.

## 🧰 Tecnologias Utilizadas
- Vue3
- Vuetify
- Nginx
- Docker / Docker Compose
- SSL / TLS
- Typescript

## 🐳 Docker & Ambiente
O projeto já está dockerizado, permitindo execução consistente em:
- Produção
- Homologação
- Desenvolvimento local

## 🚀 Como Subir o Ambiente pela primeira vez
1 - Clone o projeto e acesse a pasta do sistema
2 - na pasta certs, substitua os arquivos certs pelos seus arquivos do dominio que deseja usar, se for só local pode ser mantido porém o serviço via https estará com restrições
3 - Na pasta docker nos arquivos de default.conf e ssl.conf alterar o server_name para o nome de seu dominio
4 - Build das imagens - docker compose build
5 - Subir os containers - docker compose up -d

## 🧪 Testes Rápidos
Testar conectividade HTTPS
curl -I https://seudominio.com.br

Verifique:
- Status 200
- Certificado válido
- Ausência de erros 502 ou 504

## 🛡️ Segurança Aplicada
✔ Comunicação via HTTPS
✔ TLS 1.2 e TLS 1.3
✔ Execução de PHP isolada no container
✔ Bloqueio de acesso a arquivos .ht*
✔ Logs separados (access / error)

### 📌 Deploy automatizado
- já deixei configurado uma esteira para a branch main, onde caso realize um fork a mesma já está pronta para fazer conexão ssh com um cliente remoto e irá atualizar o projeto com as atualizações atuais da branch por meio de um git clone

## 👤 Autor / Maintainer
Ricardo dos Santos Souza
