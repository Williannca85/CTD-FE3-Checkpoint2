import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useToken } from "../hooks/useToken";
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {
  const [denstistas, setDentistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [dentistaValue, setDentistaValue] = useState("");
  const [pacienteValue, setPacienteValue] = useState("");

  const [schedule, setSchedule] = useState("");
  const {token} = useToken();
  const navigate = useNavigate();

  const { theme} = useTheme();



  useEffect(() => {

    fetch(`http://dhodonto.ctdprojetos.com.br/dentista`)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setDentistas(data)
            console.log(data)
          })
        }
        else {
          alert("Dentistas não encontrado")
        }
      })

  }, []);

  useEffect(() => {

    fetch(`http://dhodonto.ctdprojetos.com.br/paciente`)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setPacientes(data.body)
          })
        }
        else {
          alert("Pacientes não encontrado")
        }
      })

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro


    const dentista = denstistas.filter((dentista) => dentista.matricula === dentistaValue)[0]
    const paciente = pacientes.filter((paciente) => paciente.matricula === pacienteValue)[0]


    const body = {
      paciente: {
        matricula: paciente.matricula
      },
      dentista: {
        matricula: dentista.matricula
      },
      dataHoraAgendamento: schedule
    }
    console.log(schedule)

    
    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }

  const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body)
  }

  fetch(`http://dhodonto.ctdprojetos.com.br/consulta`, requestConfig)
  .then(response => {
    if (response.status === 200) {
      response.json().then(data => {
        alert("Consulta agendada com sucesso!")
        navigate("/home")
      })
    }
    else if (response.status === 403) {
      navigate("/contact")
    } else {
      response.text().then(error => {
        alert(error)
      })
    }
  })
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container${theme}a}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select className="form-select" name="dentist" id="dentist" onChange={e => setDentistaValue(e.target.value)}>
                {denstistas.map(dentista => (
                  <option key={dentista.nome} value={dentista.matricula}>
                    {`${dentista.nome} ${dentista.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select className="form-select" name="patient" id="patient" onChange={e => setPacienteValue(e.target.value)}>
                {pacientes.map(paciente => (
                  <option key={paciente.matricula} value={paciente.matricula}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </option>
                ))}

              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={e => setSchedule(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn ${theme} ${styles.button
                }`}
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Agenda
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;