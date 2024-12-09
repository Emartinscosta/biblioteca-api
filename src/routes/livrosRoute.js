import { Router } from "express";
import Livro from "../database/Livro.js"; 

const livrosRoutes = Router();

livrosRoutes.get("/livros", async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro Interno no Servidor. Tente mais Tarde!",
    });
  }
});

livrosRoutes.get("/livros/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await Livro.findByPk(id);
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({
        mensagem: "Livro não Encontrado!",
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro Interno no Servidor. Tente mais Tarde!",
    });
  }
});

livrosRoutes.post("/livros", async (req, res) => {
  const dados = req.body;
  try {
    const salvo = await Livro.create(dados);
    res.json(salvo);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro Interno no Servidor. Tente mais Tarde!",
    });
  }
});

livrosRoutes.put("/livros/:id", async (req, res) => { 
  const { id } = req.params;
  const dados = req.body;
  try {
    const livro = await Livro.findByPk(id); 

    if (livro) {
      await livro.update(dados);
      res.json(livro);
    } else {
      res.status(404).json({
        mensagem: "Livro não Encontrado!",
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro Interno no Servidor. Tente mais Tarde!",
    });
  }
});

livrosRoutes.delete("/livros/:id", async (req, res) => { 
  const { id } = req.params;
  try {
    const livro = await Livro.findByPk(id); 

    if (livro) {
      await livro.destroy();
      res.json({ mensagem: "Livro Removido!" });
    } else {
      res.status(404).json({
        mensagem: "Livro não Encontrado!",
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro Interno no Servidor. Tente mais Tarde!",
    });
  }
});

export default livrosRoutes;
