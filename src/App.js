import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    repositoryList();
  }, []);

  const repositoryList = async () => {
    const response = await api.get("repositories");
    setRepositories(response.data);
  };

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Alguma coisa",
      url: "www.google.com.br",
      techs: ["React", "Node.js", "Go"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const list = repositories.filter((repository) => repository.id !== id);
    setRepositories(list);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
