import React, { FormEvent, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import api, { apiCEP } from "../../services/api";

import { Container, ConainerForm } from "./styles";

const Create: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [adress, setAdress] = useState("");
  const [num, setNum] = useState("");
  const [comple, setComple] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setServices] = useState("");
  const [about, setAbout] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("cep", cep);
    data.append("adress", adress+num+comple);
    data.append("services", service);
    data.append("about", about);

    // images.forEach((image) => {
    //   data.append("images", image);
    // });

    await api.post("clinic", data);

    alert("Cadastro realizado com sucesso!");

    history.push("/");
  }

  function searchCEP(value: string) {
    try {
      apiCEP.get(`${value}/json/`).then((response) => {
        const end: any = response.data;

        setAdress(`${end.localidade}-${end.uf} - ${end.logradouro},`);
      });
    } catch (err) {}
  }
  return (
    <>
      <Header title="Nova Clínica" hiddeButtonBack={false} showButton={false}>
        <FiArrowLeft size={32} />
      </Header>
      <Container>
        <ConainerForm>
          <h1>Formulário de Cadastro</h1>
          <form onSubmit={handleSubmit}>
            <div className="content-input">
              <label htmlFor="">Nome:</label>
              <input
                required
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="content-input">
              <label htmlFor="">E-mail:</label>
              <input
                required
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="content-input">
              <label htmlFor="">Telefone:</label>
              <input
                required
                type="number"
                onChange={(e) => {
                  setPhone(`N°:${e.target.value}`);
                }}
              />
            </div>
            <div className="content-input">
              <label htmlFor="" className="cep">
                CEP:
              </label>
              <input
                type="number"
                required
                onBlur={() => searchCEP(cep)}
                onChange={(e) => {
                  setCep(e.target.value);
                }}
              />
            </div>
            <div className="content-input-adress">
              <label htmlFor="" className="cep">
                Endereço:
              </label>
              <input type="text" disabled value={adress} />
              <label htmlFor="" className="cep">
                N°:
              </label>
              <input
                type="number"
                onChange={(e) => {
                  setNum(e.target.value);
                }}
              />
              
            </div>
            <div className="content-input">
            <label htmlFor="" className="cep">
                Complemento:
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setComple(e.target.value);
                }}
              />
            </div>
            <div className="content-input">
              <label htmlFor="" className="cep">
                Serviços:
              </label>
              <input
                type="text"
                required
                onChange={(e) => {
                  setServices(e.target.value);
                }}
              />
            </div>
            <div className="content-input">
              <label htmlFor="" className="cep">
                Sobre:
              </label>
              <input
                type="textarea"
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <button type="submit">Salvar</button>
          </form>
        </ConainerForm>
      </Container>
    </>
  );
};

export default Create;
