# Api Social Comunik

## Instalação

Clone o repositório usando o comando:
```bash
git clone https://github.com/eudesroger7/ApiSocialComunik.git
```
Após clonar, instale as depedências usando o comando:
```bash
npm install
```
Feito isso, crie o arquivo `.env` seguindo o modelo que está no arquivo `.env.example`.

### Migrations

Execute o comando para a criação das migrations:

```bash
adonis migration:run --force
```
 ### Seed

Após concluir a criação das migrations, execute o comando para rodar as seeds:

```bash
adonis seed --force
```
