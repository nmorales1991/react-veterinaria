import React, { Component } from 'react'
import "./bootstrap.min.css";
import Header from './components/Header'
import NuevaCita from './components/NuevaCita'
import ListaCitas from './components/ListaCitas'

export default class App extends Component {
	state={
		citas:[]
	}

	componentDidMount(){
		const citasLS = localStorage.getItem('citas')
		if(citasLS){
			this.setState({
				citas: JSON.parse(citasLS)
			})
		}
	}

	componentDidUpdate(){
		localStorage.setItem('citas',JSON.stringify(this.state.citas))
	}

	crearNuevaCita = datos =>{
		const citas = [...this.state.citas,datos]
		this.setState({
			citas
		})
	}

	eliminarCita = id =>{
		//siempre sacar una copia del state cuando se va a modificar
		const citasActuales = [...this.state.citas]
		const citas = citasActuales.filter(cita=>cita.id!==id)//filter es casi como un map(recorre cada elemento del array, y devuelve según el filtro)
		this.setState({
			citas
		})
	}
	render() {
		return (
			<div className="container">
				<Header titulo="Administrador Pacientes de Veterinaria"/>
				<div className="row">
					<div className="col-md-10 mx-auto">
						<NuevaCita crearNuevaCita={this.crearNuevaCita}/>
					</div>
					<div className="mt-5 col-md-10 mx-auto">
						<ListaCitas eliminarCita={this.eliminarCita} citas={this.state.citas}/>
					</div>
				</div>
			</div>
		)
	}
}
