-- Criação do banco de dados (se ainda não existir)
CREATE DATABASE IF NOT EXISTS task_manager;

-- Seleção do banco de dados
USE task_manager;

-- Criação da tabela 'tasks'
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL
);

-- Adiciona alguns dados de exemplo (opcional)
INSERT INTO tasks (title, description, status) VALUES
('Tarefa de Exemplo', 'Descrição de exemplo', 'Pendente');
