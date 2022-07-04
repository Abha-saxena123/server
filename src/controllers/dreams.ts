import { Request, Response } from "express";
import { connectToDatabase } from "../database/mongo";
import { ObjectId } from "mongodb";

// get all dreams
// get one dream details
// add dream
// update dream -> edit / mark it done
// delete dream

const getDreamList = async (req: Request, res: Response) => {
  try {
    const {
      query: { user },
    } = req;
    let { db } = await connectToDatabase();
    const dreamList = await db
      .collection("dreamItems")
      .find({ firstName: user })
      .toArray();

    return res.status(200).json({ data: dreamList });
  } catch (e) {
    return res.status(404).send(e);
  }
};

const getDreamDetails = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  let { db } = await connectToDatabase();
  console.log(id);
  const dreamDetails = await db
    .collection("dreamItems")
    .find({ _id: new ObjectId(id as string) })
    .toArray();
  console.log("@@@@@@@@@@@@@@@@@", dreamDetails);
  res.status(200).json({ data: dreamDetails[0] });
};

const addDreamDetails = async (req: Request, res: Response) => {
  const newItem = req.body;
  let { db } = await connectToDatabase();
  console.log("@@@@@@@@@@@@@@@@@@@@@", newItem, req);

  db.collection("dreamItems").insertOne(newItem, function (err, res) {
    if (err) {
      console.log("ERROR", err);
      throw err;
    }
    console.log("1 Item inserted");
  });
  res.status(200).send({ message: "Dream added successfully" });
};

const updateDreamDetails = async (req: Request, res: Response) => {
  const { _id, isDone, experience } = req.body;
  let { db } = await connectToDatabase();
  const dreamList = await db
    .collection("dreamItems")
    .updateOne(
      { _id: new ObjectId(_id as string) },
      { $set: { isDone: isDone, experience: experience } }
    );
  res.status(200).json({ data: "Dream updated successfully" });
};

export default {
  getDreamList,
  getDreamDetails,
  addDreamDetails,
  updateDreamDetails,
};
