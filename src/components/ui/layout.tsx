import { ReactElement } from "react";
import {Outlet, Routes, Route ,Link} from 'react-router-dom';

import { FileProvider} from "./file";
import { FileUploader } from ".";

import '../../styles/styles.css'
import FileHistory from "./file-history";


function Layout(): ReactElement {
  return (
    <FileProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "white" }}>
          <nav className="navbar">
            <Link to="/">
              <img
                src="https://framerusercontent.com/images/f0btmN2GtVDhwuoOUM5xAjorM.png"
                alt="Logo" style={{ width: "150px", height: "auto" }}
              />
            </Link>
            <ul className="list">
              <li className="item">
                <Link to="/">Upload de Arquivos</Link>
              </li>
              <li className="item">
                <Link to="/history">Histórico de Arquivos</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<FileUploader file={null} />} />
            <Route path="/history" element={<FileHistory/>} />
          </Routes>
        </div>
        <footer className="bg-emerald-50 text-gray-800 p-4">
          <p>© 2024 Kanastra - Todos os Direitos Reservados</p>
        </footer>

    </FileProvider>

  );
}

export { Layout };
