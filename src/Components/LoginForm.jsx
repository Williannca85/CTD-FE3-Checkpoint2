import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useToken } from "../hooks/useToken";
import styles from "./Form.module.css";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const {changeToken} = useToken();

  const {theme} = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: login,
      password: password
    }
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(data)
    }

    fetch(`http://dhodonto.ctdprojetos.com.br/auth`, requestConfig)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            changeToken(data.token)
            console.log(data.token)
            navigate("/home")
          })

        } else {
          alert("Verifique suas credenciais")
        }
      });
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card-${theme} container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              onChange={event => setLogin(event.target.value)}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              onChange={event => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" type="submit" onClick={event => handleSubmit(event)}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;