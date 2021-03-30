import React from "react";
import "bulmaswatch/darkly/bulmaswatch.min.css";
import axios from "axios";

class InfectedButton extends React.Component {
  state = {
    id: "",
  };

  handleClick = async () => {
    const response = await axios.put(
      `http://localhost:3001/users/infected/${this.state.id}`
    );
    if (response.status === 404) {
      alert("Nincs ilyen felhasználó");
    } else if (response.status === 400) {
      alert("Nem adta meg az azonosítóját");
    } else if (response.status === 200) {
      alert("Sikeres jelentés! Köszönjük, és jobbulást");
    } else {
      alert("Hiba történt");
    }
  };

  handleKeyUp = (e) => {
    this.setState({ id: e.target.value });
  };
  render = () => {
    return (
      <div className="card m-2 column">
        <header className="card-header">
          <p className="card-header-title">Fertőzött vagyok</p>
        </header>
        <div className="card-content">
          <div className="content">
            <div class="field">
              <label class="label">Azonosító</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="pl.: xyz123"
                  onKeyUp={(event) => this.handleKeyUp(event)}
                />
              </div>
            </div>
            <div className="field">
              <div class="control">
                <button class="button is-link" onClick={this.handleClick}>
                  Fertőzött vagyok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default InfectedButton;
