import React from "react";
import { Map, Draggable } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import axios from "axios";

class Report extends React.Component {
  state = {
    content: {},
    anchor: [0, 0],
  };

  componentDidMount = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          anchor: [position.coords.latitude, position.coords.longitude],
        });
      });
    } else {
      this.setState({ anchor: [47.68, 17.65] });
    }
  };

  handleKeyDown = (e) => {
    const content = { ...this.state.content };
    const { name, value } = e.target;
    content[name] = value;

    this.setState({ content });
  };

  nameForm = () => {
    return (
      <div className="columns">
        <div className="field column is-half-tablet">
          <label className="label">Név</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="pl.: Alex Smith"
              name="name"
              onKeyUp={(event) => this.handleKeyDown(event)}
            />
          </div>
        </div>

        <div className="field column is-half-tablet">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="pl.: alexsmith@gmail.com"
              name="email"
              onKeyUp={(event) => this.handleKeyDown(event)}
            />
          </div>
        </div>
      </div>
    );
  };

  idForm = () => {
    return (
      <div className="field">
        <label className="label">Azonosító</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="pl.: xyz123"
            name="id"
            value={this.state.content.id}
            onKeyUp={(event) => this.handleKeyDown(event)}
          />
        </div>
      </div>
    );
  };

  twoForms = () => {
    return (
      <React.Fragment>
        {this.nameForm()}
        <small>vagy</small>
        {this.idForm()}
      </React.Fragment>
    );
  };

  handleDragEnd = (e) => {
    this.setState({ anchor: e });
  };
  handleSelect = (e) => {
    const content = { ...this.state.content };
    content.morning = e.target.value;
    this.setState({ content });
  };
  handleDate = (e) => {
    const content = { ...this.state.content };
    content.date = e.target.value;
    this.setState({ content });
  };

  handleSubmit = () => {
    const { content, anchor } = this.state;
    if (content.id) {
      axios.put(`http://localhost:3001/check-in/${content.id}`, {
        ...content,
        lat: anchor[0],
        lng: anchor[1],
      });
    } else {
      axios.post("http://localhost:3001/check-in", {
        ...content,
        lat: anchor[0],
        lng: anchor[1],
      });
    }
  };

  walking =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Man_walking_icon_1410105361.svg/356px-Man_walking_icon_1410105361.svg.png";

  render = () => {
    return (
      <div className="card column">
        <header className="card-header">
          <p className="card-header-title">Itt jártam</p>
        </header>
        <div className="card-content">
          {this.twoForms()}
          <label className="label">Helyszín</label>
          <Map
            height={300}
            center={this.state.anchor}
            defaultZoom={17}
            provider={osm}
            className="is-fullwidth"
          >
            <Draggable
              anchor={this.state.anchor}
              onDragEnd={(e) => this.handleDragEnd(e)}
            >
              <img
                src={this.walking}
                width={20}
                height={40}
                alt="Your position!"
              />
            </Draggable>
          </Map>
          <label className="label">Dátum</label>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="date"
                placeholder="Dátum megadása"
                onChange={(e) => this.handleDate(e)}
              />
            </div>
            <div className="control">
              <div className="select">
                <select onChange={(e) => this.handleSelect(e)}>
                  <option value={true}>Délelött</option>
                  <option value={false}>Délután</option>
                </select>
              </div>
            </div>
          </div>
          <button className="button is-primary" onClick={this.handleSubmit}>
            Bejelentés
          </button>
        </div>
      </div>
    );
  };
}

export default Report;
