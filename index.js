const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'raeldomangue',
    database: 'task_manager',
    port: 3306
});

// Conectando ao banco de dados MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Configura o middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    const sql = 'INSERT INTO tasks SET ?';
    db.query(sql, task, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar tarefa:', err);
            res.status(500).send('Erro ao adicionar tarefa');
            return;
        }
        res.send('Tarefa adicionada com sucesso!');
    });
});

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err);
            res.status(500).send('Erro ao buscar tarefas');
            return;
        }
        res.json(results);
    });
});

// Rota para obter uma tarefa específica pelo ID
app.get('/tasks/:id', (req, res) => {
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar tarefa:', err);
            res.status(500).send('Erro ao buscar tarefa');
            return;
        }
        res.json(result[0]);
    });
});

// Rota para atualizar uma tarefa pelo ID
app.put('/tasks/:id', (req, res) => {
    const sql = 'UPDATE tasks SET ? WHERE id = ?';
    const id = req.params.id;
    const task = req.body;
    db.query(sql, [task, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar tarefa:', err);
            res.status(500).send('Erro ao atualizar tarefa');
            return;
        }
        res.send('Tarefa atualizada com sucesso!');
    });
});

// Rota para excluir uma tarefa pelo ID
app.delete('/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir tarefa:', err);
            res.status(500).send('Erro ao excluir tarefa');
            return;
        }
        res.send('Tarefa excluída com sucesso!');
    });
});

// Iniciar o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
