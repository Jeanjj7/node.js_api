const db = require('./conexao');
const express = require('express');

const app = express();
app.use(express.json());
//usuarios
app.get('/usuarios', (rep, res) => {
    const sql = "SELECT * FROM tb_usuarios";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.log("Falha ao consultar usuarios");
            return res.json({ mensagem: "Falha ao consultar usuarios" });

        }
        return res.json(resultados);
    });
});

//id
app.get('/usuarios/:id', (rep, res) => {
    const id_informado = rep.params.id;
    const sql = "SELECT * FROM tb_usuarios WHERE id_usuario = ?";
    db.query(sql, [id_informado], (erro, resultados) => {
        if (erro) {
            console.log("Falha ao consultar o id do usuarios");
            return res.json({ mensagem: "Falha ao consultar usuarios" + erro.message });

        }
        if (resultados.length == 0) {
            return res.json({ mensagem: "Usuario não encontrado" });

        } else {
            return res.json(resultados);
        }

    });
});

//clientes
app.get('/clientes', (rep, res) => {
    const sql = "SELECT * FROM tb_clientes";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.log("Falha ao consultar clientes");
            return res.json({ mensagem: "Falha ao consultar clientes" + erro.message });

        }
        return res.json(resultados);
    });
});

//cadastra usuarios
app.post('/cad_usuarios', (rep, res) => {
    const { login_informado, senha_informado } = rep.body;
    const sql = "INSERT INTO tb_usuarios (login_usuario, senha_usuario) VALUES (?,?)";

    db.query(sql, [login_informado, senha_informado], (erro, resultados) => {
        if (erro) {
            console.log("Erro ao cadastrar usuário");
            return res.json({ mensagem: "Erro ao cadastrar usuário" + erro.message });
        } else {
            console.log("Cadastrado com Sucesso");
            return res.json({ mensagem: "Cadastrado com Sucesso" });
        }
        return res.json(resultados);
    });

});
//Deletar 
// http://localhost:3000/deletar_usuario/
app.delete('/deletar_usuario/:codigo', (req, res) => {
    const id_informado  = req.params.codigo;
    const sql = "DELETE FROM tb_usuarios WHERE id_usuario = ?";

    db.query(sql, [id_informado], (erro, resultados) => {
        if (erro) {

            return res.json({ mensagem: "Falha ao deletar: " + erro.message });
        }
        if (resultados.affectedRows == 0) {
            return res.json({ mensagem: "Usuário não encontrado para exclusão" });
        }else{
            return res.json({ mensagem: "Deletado com Sucesso" });
        }



    });
});

//Atualizar 
// http://localhost:3000/atualizar_usuario/
app.put('/atualizar_usuario/:codigo', (req, res) => {
    const id_informado = req.params.codigo;
    const { login_informado, senha_informado } = req.body;
    const sql = "UPDATE tb_usuarios SET login_usuario = ?, senha_usuario = ? WHERE id_usuario = ?";

    db.query(sql, [login_informado, senha_informado, id_informado], (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao atualizar : " + erro.message });
        }
        if (resultados.affectedRows == 0) {
            return res.json({ mensagem: "Usuário não encontrado para atualização" });
        } else {
            return res.json({ mensagem: "Atualizado com Sucesso" });
        }
    });
});


const porta = 3000;
app.listen(porta, () => {
    console.log("Servidor executado na porta do N°" + porta);
});



// {
//     "login_informado": "jean",
//     "senha_informado": "sportrecife"
//   }