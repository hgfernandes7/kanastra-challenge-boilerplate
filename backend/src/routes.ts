import { Router,Request,Response } from "express";
import {Readable} from "stream"
import readline from "readline"

import multer from "multer";

const multerConfig = multer();

const router = Router();

interface Clients {
  name:string;
  governmentId:string;
  email:string;
  debtAmount:number;
  debtDueDate:string;
  debtId:string;
}

router.get("/file-history",async (request:Request, response: Response) =>{
  const jsonData = {
    message: "Dados da API",
    data: [
      { id: 1, fileName: "input1.csv", date: "2024-03-25T22:48:21.654Z" },
      { id: 2, fileName: "input2.csv", date: "2024-03-25T11:25:11.344Z" },
      { id: 3, fileName: "input3.csv", date: "2024-03-25T21:37:21.154Z" }
    ]
  };
  return response.json(jsonData)
});

router.post("/upload",multerConfig.single("file"),
async (request:Request, response: Response) =>{
  const buffer = request.file?.buffer;

  const readbleFile = new Readable();
    readbleFile.push(buffer);
    readbleFile.push(null);

    const clientLine = readline.createInterface({
      input: readbleFile
    });

    const clients: Clients[] = [];
    let isFirstLine = true;

    for await(const line of clientLine){
      const clientLineSplit = line.split(",")

      if (isFirstLine) {
        isFirstLine = false;
        continue; // Ignora a primeira linha
      }

      clients.push({
        name:clientLineSplit[0],
        governmentId:clientLineSplit[1],
        email:clientLineSplit[2],
        debtAmount:Number(clientLineSplit[3]),
        debtDueDate:clientLineSplit[4],
        debtId:clientLineSplit[5]
      })
    }
    console.log(request.file?.buffer.toString())
    return response.json(clients);
  }
);

export {router};
