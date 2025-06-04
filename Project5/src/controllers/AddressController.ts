import { Request, Response } from "express";
import AddresModel from "../models/AddressModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Addres = await AddresModel.findAll();
    res.status(200).json(Addres);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getAddresById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Addres = await AddresModel.findByPk(req.params.id);

    if (!Addres) {
      return res.status(404).json({ error: "Endereço não encontrada" });
    }

    return res.status(200).json(Addres);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createAddres = async (req: Request, res: Response) => {
  try {
    const {
      ID_address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      id_user,
      ID_order,
    } = req.body;
    if (!ID_address || ID_address.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Endereço válido" });
    }
    const Addres = await AddresModel.create({
      ID_address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      id_user,
      ID_order,
    });
    return res.status(201).json(Addres);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const updateAddres = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const {
      ID_address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      id_user,
      ID_order,
    } = req.body;

    if (!ID_address || ID_address.trim() === "") {
      return res
        .status(400)
        .json({ error: "Digite um nome de Endereço válido" });
    }

    const Addres = await AddresModel.findByPk(req.params.id);

    if (!Addres) {
      return res.status(404).json({ error: "Endereço não encontrada" });
    }

    Addres.ID_address = ID_address;
    Addres.number = number ?? Addres.number;
    Addres.complement = complement ?? Addres.complement;
    Addres.neighborhood = neighborhood ?? Addres.neighborhood;
    Addres.city = city ?? Addres.city;
    Addres.state = state ?? Addres.state;
    Addres.zipCode = zipCode ?? Addres.zipCode;
    Addres.id_user = id_user ?? Addres.id_user;
    Addres.ID_order = ID_order ?? Addres.ID_order;

    await Addres.save();

    return res.status(200).json(Addres);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const destroyAddresById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Addres = await AddresModel.findByPk(req.params.id);

    if (!Addres) {
      return res.status(404).json({ error: "Endereço não encontrada" });
    }

    await Addres.destroy();
    return res.status(200).json({ message: "Endereço deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};
