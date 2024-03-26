import {useEffect,useState} from "react"
import { api } from "@/services/api";

import '../../styles/styles.css';

interface FilesProps{
  id:string;
  fileName:string;
  date:string;
}

export default function FileHistory(){

  const[files,setFiles] = useState<FilesProps[]>([])

  useEffect(() =>{
    loadFiles();
  },[])

  async function loadFiles() {
    const response = await api.get("/file-history")
    setFiles(response.data);
  }
  return(

    <section className="section">
      {files.map( (file) => (
      <article key={file.id}>
        <p><span>id</span>{file.id}</p>
          <p><span>Arquivo</span>{file.fileName}</p>
          <p><span>Data envio</span>{file.date}</p>
        </article>
      ))}
    </section>
  )
}
