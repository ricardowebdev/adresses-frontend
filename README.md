## 🚀 Adresses frontend
Este projeto tem como finalizade apenas demonstrar de forma básica um frontend que consome uma api externa no caso o viacep buscando informações de endereços nacionais
podendo ser registrados e consultados posteriormente em uma base de dados.
Para que seu layout não fosse completamente simples integrei apenas o CSS do bootstrap

## 🧰 Tecnologias Utilizadas
- HTML
- Nginx
- Docker / Docker Compose
- SSL / TLS
- Javascript puro

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
