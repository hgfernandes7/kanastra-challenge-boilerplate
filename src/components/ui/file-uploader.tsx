import { ChangeEvent, useState,useRef} from 'react';
import { api } from '../../services/api'

import '../../styles/styles.css';

type FileUploaderProps = {
  file: File | null;
}
const FileUploader = ({ file }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadedFileInfo, setUploadedFileInfo] = useState<File | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // Clicar no input oculto quando o botão é clicado
    }
  };

  const handleUpload = async () => {
    if (selectedFile){
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await api.post('/upload',formData);
        console.log(response.data)

      } catch (error) {
        console.error('Erro:', error);
      }
    }

  };
  return (
    <div className = "file-upload">
      <div className="flex items-center gap-4">
        <input
          ref={inputFileRef}
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button className="button" onClick={handleButtonClick}>
          Selecionar Arquivo
        </button>
      </div>
      {selectedFile && (
        <button className="button" onClick={handleUpload}>
          Enviar Arquivo
        </button>
      )}
      {selectedFile && (
        <section className='section'>
          <p className="pb-6">Detalhes do arquivo:</p>
          <ul>
            <li>Name: {selectedFile.name}</li>
            <li>Tipo: {selectedFile.type}</li>
            <li>Tamanho: {selectedFile.size} bytes</li>
          </ul>
        </section>
      )}


    </div>
  );
};

export { FileUploader };
