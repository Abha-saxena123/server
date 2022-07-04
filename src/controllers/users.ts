import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { connectToDatabase } from "../database/mongo";
import { ObjectId } from "mongodb";

const addUser = async (req: Request, res: Response) => {
  try {
    console.log("@@@@@@@@@@@@@@@@@ entered");
    let { db } = await connectToDatabase();
    const newUser = req.body;
    db.collection("users").insertOne(newUser, function (err, res) {
      if (err) throw err;
    });
    res.status(200).send({ message: "User added successfully" });
  } catch (e) {
    return res.status(404).send(e);
  }
};

export default { addUser };
