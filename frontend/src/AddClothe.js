import React, {Component} from 'react';
import './AddSmth.css';
import './Form.css';
import './AddClothe.css'
import axios from 'axios';
import {Link} from "react-router-dom";

let endpoint = "http://localhost:5000";

class AddClothe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            style: '',
            category: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeStyle = this.handleChangeStyle.bind(this);
    }

    handleChangeName = (event) => {
        this.setState({name: event.target.value});
    }
    handleChangeCategory = (event) => {
        this.setState({category: event.target.value});
    }
    handleChangeStyle = (event) => {
        this.setState({style: event.target.value});
    }

    addClothe = () => {
        // console.log(this.state.value);
        axios
            .post(endpoint + "/api/home/clothes", {
                name: this.state.name,
                style: this.state.style,
                category: this.state.category
            })
            .then((response) => {
                alert(response.status);
            })
    }
    render() {
        return (
            <div className="AddPlace">
            <h3>Форма добавления Одежды</h3>
        <div className="form__container AddClothe">
            <div><label>Название</label><input type="text" placeholder="Название" onChange={this.handleChangeName}></input></div>
            <div><label>Стиль</label><input type="text" placeholder="Стиль" onChange={this.handleChangeStyle}></input></div>
            <div><label>Категория</label><input type="text" placeholder="Категория" onChange={this.handleChangeCategory}></input></div>
        </div>
        <div className="wrap-btn">
            <button className="addSmth_button"><Link to="/home/places/">Back</Link></button>
        <button type="submit" className="addSmth_button" onClick={this.addClothe}>Добавить</button>
        </div>
        </div>
    );
    }
}


export default AddClothe;