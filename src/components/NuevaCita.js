import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from 'prop-types'

const stateInicial = {
  cita: {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  },
  error: false
};

export default class NuevaCita extends Component {
  state = {...stateInicial };

  handleChange = e => {
    this.setState({
      cita: {
        ...this.state.cita, //con spread operator saco una copia del state para que no quede sólo el campo que se está escribiendo, y quede todo el objeto completo
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;
    if (
      mascota === "" ||
      propietario === "" ||
      fecha === "" ||
      hora === "" ||
      sintomas === ""
    ) {
      this.setState({
        error: true
      });
      return;
    }

    const nuevaCita = { ...this.state.cita };
    nuevaCita.id = uuid();

	this.props.crearNuevaCita(nuevaCita);
	this.setState({
		...stateInicial
	})
  };
  render() {
    const { error } = this.state;
    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">
            Llena el formulario para crear una nueva cita
          </h2>
          {error ? (
            <div className="alert alert-danger mt-2 mb-5 text-center">
              Todos los campos son obligatorios
            </div>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Mascota
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Dueño
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Dueño Mascota"
                  name="propietario"
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>
              <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="time"
                  className="form-control"
                  name="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Síntomas
              </label>
              <div className="col-sm-8 col-lg-10">
                <textarea
                  className="form-control"
                  name="sintomas"
                  placeholder="Describe los Síntomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                />
              </div>
            </div>
            <input
              type="submit"
              className="py-3 mt-2 btn btn-success btn-block"
              value="Agregar Nueva Cita"
            />
          </form>
        </div>
      </div>
    );
  }
}
NuevaCita.propTypes={
  crearNuevaCita:PropTypes.func.isRequired,
}