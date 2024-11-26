import express from 'express';

import session from 'express-session';

import cookieParser from 'cookie-parser';


const app = express();

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./pages/public'));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = [];

function cadastroProdutospag(req, resp) {
    resp.send(`
            <html>
                <head>
                    <title>Cadastrar Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro Produtos</h1>
                    <form method="POST" action="/cadastrarProdutos" class="border p-3 row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="cod" class="form-label">Código de Barras</label>
                            <input type="number" class="form-control" id="cod" name="cod" required>
                        </div>
                        <div class="col-md-4">
                            <label for="descricao" class="form-label">Descrição</label>
                            <input type="text" class="form-control" id="descricao" name="descricao" required>
                        </div>
                        <div class="col-md-4">
                            <label for="pcusto" class="form-label">Preço de Custo</label>
                            <input type="number" class="form-control" id="pcusto" name="pcusto" required>
                        </div>
                        <div class="col-md-4">
                            <label for="pvenda" class="form-label">Preço de Venda</label>
                            <input type="number" class="form-control" id="pvenda" name="pvenda" required>
                        </div>
                        <div class="col-md-4">
                            <label for="validade" class="form-label">Validade</label>
                            <input type="date" class="form-control" id="validade" name="validade" required>
                        </div>
                        <div class="col-md-4">
                            <label for="qestoque" class="form-label">Quantidade em Estoque</label>
                            <input type="number" class="form-control" id="qestoque" name="qestoque" required>
                        </div>
                        <div class="col-md-4">
                            <label for="fabnome" class="form-label">Fabricante</label>
                            <input type="text" class="form-control" id="fabnome" name="fabnome" required>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
    `);
}

function menuView(req, resp) {
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin) {
        dataHoraUltimoLogin = '';
    }

    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">MENU</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                               <a class="nav-link active" href="/cadastrarProdutos">Cadastrar Produto</a>
                                <a class="nav-link" href="/logout">Sair</a>
                                <a class="nav-link disabled">Último acesso: ${dataHoraUltimoLogin}</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
}

function cadastrarProdutos(req, resp) {

    const cod = req.body.cod;
    const descricao = req.body.descricao;
    const pcusto = req.body.pcusto;
    const pvenda = req.body.pvenda;
    const validade = req.body.validade;
    const qestoque = req.body.qestoque;
    const fabnome = req.body.fabnome;



    let dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'] || '';

    if (cod && descricao && pcusto && pvenda && validade && qestoque && fabnome) {

        const produto = { cod, descricao, pcusto, pvenda, validade, qestoque, fabnome };


        listaProdutos.push(produto);

        resp.write(`
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Código de Barras</th>
                        <th scope="col">Descrição do Produto</th>
                        <th scope="col">Preço de Custo</th>
                        <th scope="col">Preço de Venda;</th>
                        <th scope="col">Data de Validade</th>
                        <th scope="col">Quantidade em Estoque</th>
                        <th scope="col">Fabricante</th>


                    </tr>
                </thead>
                <tbody>`);
        for (var i = 0; i < listaProdutos.length; i++) {
            resp.write(`<tr>
                            <td>${listaProdutos[i].cod}</td>
                            <td>${listaProdutos[i].descricao}</td>
                            <td>${listaProdutos[i].pcusto}</td>
                            <td>${listaProdutos[i].pvenda}</td>
                            <td>${listaProdutos[i].validade}</td>
                            <td>${listaProdutos[i].qestoque}</td>
                            <td>${listaProdutos[i].fabnome}</td>
                         </tr>`);
        }

        resp.write(`</tbody> 
            </table>
            <a class="btn btn-primary" href="/cadastrarProdutos">Continuar Cadastrando</a>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>                              
            <a class="nav-link disabled">Último acesso: ${dataHoraUltimoLogin}</a>

            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
            `);
    } else {
        resp.write(`
                <html>
                <head>
                    <title>Cadastro de Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro de Produtos</h1>
                        <form method="POST" action="/cadastroProdutos" class="border p-3 row g-3" novalidate>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="cod" class="form-label">Código de Barras</label>
                    <input type="number" class="form-control" id="cod" name="cod" placeholder="Digite o código de barras" value="${cod || ''}">
            `);
        if (!cod) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe o código de barras!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="descricao" class="form-label">Descrição</label>
                    <input type="text" class="form-control" id="descricao" name="descricao" placeholder="Digite a descrição do produto" value="${descricao || ''}">
            `);
        if (!descricao) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe a descrição do produto!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="pcusto" class="form-label">Preço de Custo</label>
                    <input type="number" step="0.01" class="form-control" id="pcusto" name="pcusto" placeholder="Digite o preço de custo" value="${pcusto || ''}">
            `);
        if (!pcusto) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe o preço de custo!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="pvenda" class="form-label">Preço de Venda</label>
                    <input type="number" step="0.01" class="form-control" id="pvenda" name="pvenda" placeholder="Digite o preço de venda" value="${pvenda || ''}">
            `);
        if (!pvenda) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe o preço de venda!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="validade" class="form-label">Validade</label>
                    <input type="date" class="form-control" id="validade" name="validade" value="${validade || ''}">
            `);
        if (!validade) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe a validade do produto!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="qestoque" class="form-label">Quantidade em Estoque</label>
                    <input type="number" class="form-control" id="qestoque" name="qestoque" placeholder="Digite a quantidade em estoque" value="${qestoque || ''}">
            `);
        if (!qestoque) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe a quantidade em estoque!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-md-4">
                    <label for="fabnome" class="form-label">Fabricante</label>
                    <input type="text" class="form-control" id="fabnome" name="fabnome" placeholder="Digite o nome do fabricante" value="${fabnome || ''}">
            `);
        if (!fabnome) {
            resp.write(`
                    <div>
                        <span><p class="text-danger">Por favor, informe o nome do fabricante!</p></span>
                    </div>
                `);
        }
        resp.write(`</div>`);

        resp.write(`
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                </div>
                </form>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            </html>
            `);

        resp.end();
    }
}

function autenticarUsuario(req, resp) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === '123') {
        req.session.usuarioLogado = true;
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
        resp.redirect('/');
    }
    else {
        resp.send(`
                    <html>
                        <head>
                         <meta charset="utf-8">
                         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                               integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                        </head>
                        <body>
                            <div class="container w-25"> 
                                <div class="alert alert-danger" role="alert">
                                    Usuário ou senha inválidos!
                                </div>
                                <div>
                                    <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                                </div>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                                crossorigin="anonymous">
                        </script>
                    </html>
                  `
        );
    }
}

function verificarAutenticacao(req, resp, next) {
    if (req.session.usuarioLogado) {
        next();
    } else {
        resp.send(`
            <html>
                <head>
                    <title>Cadastro de Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container text-center">
                        <h1>Você precisa estar logado para cadastrar produtos!</h1>
                        <p>Por favor, faça o login para continuar.</p>
                                    <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
        `);
    }
}

app.get('/cadastrarProdutos', verificarAutenticacao, cadastroProdutospag);
app.get('/login', (req, resp) => {
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html');
});

app.post('/login', autenticarUsuario);
app.get('/', verificarAutenticacao, menuView);
app.get('/cadastrarProdutos', verificarAutenticacao, cadastroProdutospag);
app.post('/cadastrarProdutos', verificarAutenticacao, cadastrarProdutos);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});