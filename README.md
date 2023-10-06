# Projeto Interdisciplinar II - Sistemas de Informação ESPM

<p style="text-align: center;">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://avatars.githubusercontent.com/u/49880458?s=200&v=4" alt="Sistemas de Informação ESPM" style="height: 200px; width: 200px;"/></a>
</p>

# START

### 2023-02

## Integrantes
- [Eshley](https://github.com/Eshinha) 
    - Front-End
- [Felipe Lira](https://github.com/Felpslira)
    - Front-End  
- [Felipe Murakami](https://github.com/Murakami1410)
    - Front-End
- [João Pedro Mascena](https://github.com/mascenaa)
    - Full-Stack
- [Marty](https://github.com/martz3)
    - Full-Stack

## Descrição do nosso projeto

O Start de uma rede social que busca humanizar as interações entre programadores. Assim, permitindo que eles compartilhem mais do seu dia-a-dia programando com mais naturalidade e sem se prender ao profissionalismo.

# Detalhes de Configuração

```
Aqui deve ser colocado o conteúdo do arquivo .env e/ou de outros arquivos de configuração, ou detalhes de arquivos ou pastas que não estão no repositório do projeto, mas que devem existir para que o projeto possa ser executado com sucesso.

Por exemplo, a descrição do conteúdo do arquivo .env, ou nomes de pastas que precisam existir.

(Remover esse aviso na versão final)
```

Para funcionar corretamente, devem ser criados os seguintes arquivos/pastas nos caminhos especificados, com o conteúdo especificado:

- O arquivo `.env` deve ser criado em `/`, com o conteúdo abaixo:
```
app_localIp=0.0.0.0
app_port=3000
app_root=
# Não pode terminar com barra /
app_urlSite=http://localhost:3000
app_cookie=[NOME DO COOKIE]
app_cookieSecure=0
app_staticFilesDir=public
app_disableStaticFiles=0
app_sqlConfig_connectionLimit=30
app_sqlConfig_waitForConnections=1
app_sqlConfig_charset=utf8mb4
app_sqlConfig_host=localhost
app_sqlConfig_port=3306
app_sqlConfig_user=[USUÁRIO DO BANCO]
app_sqlConfig_password=[SENHA DO USUÁRIO DO BANCO]
app_sqlConfig_database=[NOME DO BANCO]
app_usuarioSenhaPadrao=[SENHA PADRÃO PARA NOVOS USUÁRIOS]
app_usuarioHashSenhaPadrao=[HASH DA SENHA PADRÃO PARA NOVOS USUÁRIOS]
# Não utilizar números > 0x7FFFFFFF pois os XOR resultarão em -1
app_usuarioHashId=[HASH DE 32 BITS PARA O ID EM HEXADECIMAL, COMO 0x1234ABCD]
FIREBASE_APIKEY="AIzaSyCAGOdBjlg-ieXmSEFK6r-btEIqdvmUw4w"
FIREBASE_AUTHDOMAIN="start-f90c7.firebaseapp.com"
FIREBASE_PROJECTID="start-f90c7"
FIREBASE_STORAGEBUCKET="start-f90c7.appspot.com"
FIREBASE_MESSAGINGSENDERID="226738184444"
FIREBASE_APPID="1:226738184444:web:479d851678f96fadbd3779"
```

- A pasta `dados` deve ser criada em `/`
- A pasta `imagens` dee ser criada em `/dados`

# Licença

Este projeto é licenciado sob a [MIT License](https://github.com/tech-espm/inter-2sem-2023-start/blob/main/LICENSE).
