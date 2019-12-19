import React, {Component} from 'react';
import './Admin.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

let endpoint = "http://localhost:5000";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        axios
            .get(endpoint + "/api/admin/users")
            .then(res => {
                console.log(res.data);
                this.setState({
                    users: res.data.map(item => {
                        return item;
                    })
                })
            })
    }

    sendFile = () => {
        let formData = new FormData();
        formData.append("myFile", document.getElementById("file").files[0]);

        axios
            .post(endpoint + "/admin", formData)
            .then((response) => {
                alert(response.status);
            })
    }

  render() {
      let rows = [];
      let email = '';
      let name ='';
      let age = '';

      this.state.users.forEach((item, i) => {
          // places.push(item['placeName']);
          email = item['Email'];
          name = item['Name'];
          age = item['Age'];
          // item['Clothes'].forEach((elem) => {
          //     clothes = `${clothes}${(clothes ? ', ' : '')}${elem['color']} ${elem['name']}`;
          // });
          rows.push(<tr key={i}>
          <td>{email}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td><button className="green">insert</button><button className="red">del</button></td>
          </tr>);
          email = '';
          name = '';
          age = '';
      })
    return (
        <div className="wrap Admin">
            <table className="Admin">
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <div className="wrap-btn Admin">
                <button><Link to='/home/places'>Статистика</Link></button>
                <button><Link to='/home/categories'>Add user</Link></button>
                <button>Экспорт</button>
                <input type="file" id="file"></input>
                <button onClick={this.sendFile}>Импорт</button>
            </div>
        </div>
    );
  }
}
  

export default Admin;