// file.tsx
import { ReactNode, createContext, useContext, useReducer } from "react";

enum FileActionType {
  SELECT_FILE = "SELECT_FILE"
}

type SelectFileAction = ReducerAction<
  FileActionType.SELECT_FILE,
  Partial<FileContextState>
>;

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[]; // & {} You can add more information about the challenge inside this type
};

type FileAction = ReducerAction<
  FileActionType,
  Partial<FileContextState>
>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  isLoading: false,
};

const FileContext = createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction | SelectFileAction // Adicione SelectFileAction aqui
): FileContextState => {
  switch (action.type) {
    case FileActionType.SELECT_FILE: // Caso de ação para selecionar arquivo
      return {
        ...state,
        file: action.payload?.file || null // Define o arquivo no estado
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

// Componente FileUpload
export const FileUpload = () => {
  const { dispatch } = useFileContext(); // Obtenha a função de despacho do contexto

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Obtenha o arquivo selecionado
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:3333/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Se o upload for bem-sucedido, atualize o estado do arquivo no frontend
          dispatch({ type: FileActionType.SELECT_FILE, payload: { file } });
        } else {
          console.error('Erro ao fazer o upload do arquivo.');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

// Componente FileProvider
export const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

// Componente FileHistory
export const FileHistory = () => {
  const { state } = useFileContext(); // Obtenha o estado do contexto

  return (
    <div>
      <h2>Histórico de Arquivos</h2>
      <ul>
        {state.fileList.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);

  if (context === undefined)
    throw new Error("useFileContext must be used within a FileProvider");

  return context;
};
