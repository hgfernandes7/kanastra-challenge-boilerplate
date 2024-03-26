import React from 'react';
import '../../styles/styles.css'; // Importe os estilos CSS

type ContainerProps = {
  children: React.ReactNode; // Defina o tipo das propriedades
};

function Container(props: ContainerProps) {
  return <div className={"container"}>{props.children}</div>;
}

export default Container;
