import { Request, Response } from "express";
import CommentModel from "../models/CommentModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Comments = await CommentModel.findAll();
    res.status(200).json(Comments);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getCommentsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Comments = await CommentModel.findByPk(req.params.id);

    if (!Comments) {
      return res.status(404).json({ error: "Comentário não encontrada" });
    }

    return res.status(200).json(Comments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createComments = async (req: Request, res: Response) => {
  try {
    const { id_user, id_product, content, rating, creation_date } = req.body;

    const Comments = await CommentModel.create({
      id_user,
      id_product,
      content,
      rating,
      creation_date: new Date(),
    });
    return res.status(201).json(Comments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateComments = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id_user, id_product, content, rating, creation_date } = req.body;

    if (!id_product || id_product.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Comentário válido" });
    }

    const Comments = await CommentModel.findByPk(req.params.id);

    if (!Comments) {
      return res.status(404).json({ error: "Comentário não encontrada" });
    }

    Comments.id_user = id_user;
    Comments.id_product = id_product ?? Comments.id_product;
    Comments.content = content ?? Comments.content;
    Comments.rating = rating ?? Comments.rating;
    Comments.creation_date = creation_date ?? Comments.rating;

    await Comments.save();

    return res.status(200).json(Comments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyCommentsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Comments = await CommentModel.findByPk(req.params.id);

    if (!Comments) {
      return res.status(404).json({ error: "Comentário não encontrada" });
    }

    await Comments.destroy();
    return res.status(200).json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};
