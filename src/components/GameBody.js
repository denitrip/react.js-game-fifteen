import React from 'react';
import WinnerMessage from './WinnerMessage.js'
import StartMenu from './StartMenu.js'

class GameBody extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      gameData: [],
      initialGameData: [],
      gameFinished: false,
      gameStarted: false,
      gameDimension: 0
    };

    this.onItemClick = this.onItemClick.bind(this);
    this.makeMove = this.makeMove.bind(this);
    this.changeCoordinates = this.changeCoordinates.bind(this);
    this.isGameFinished = this.isGameFinished.bind(this);
    this.setGameDimension = this.setGameDimension.bind(this);
  }

  onItemClick(row, cellIndex) {
    const rowIndex = this.state.gameData.indexOf(row);
    this.makeMove(cellIndex, rowIndex);
  }

  setGameDimension(selectedDimension) {
    let initialArray = [];
    for (let i = 0; i < Math.pow(selectedDimension.value, 2); i++) {
      initialArray[i] = i
    }
    //delete 0 from the beggining and add to the end
    initialArray.shift();
    initialArray.push(0);
    this.setState(_ => ({
      gameStarted: true,
      gameDimension: selectedDimension.value,
      initialGameData: [...initialArray],
      gameData: initialArray.sort(() => Math.random() - 0.5).reduce((rows, key, index) => (index % selectedDimension.value === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, [])
    }))
  }

  makeMove(cellIndex, rowIndex) {
    if (cellIndex > 0 && this.state.gameData[rowIndex][cellIndex - 1] === 0) {
      this.changeCoordinates(rowIndex, cellIndex - 1, rowIndex, cellIndex);
    } else if (rowIndex < this.state.gameData.length - 1 && this.state.gameData[rowIndex + 1][cellIndex] === 0) {
      this.changeCoordinates(rowIndex + 1, cellIndex, rowIndex, cellIndex);
    } else if (cellIndex < this.state.gameData.length - 1 && this.state.gameData[rowIndex][cellIndex + 1] === 0) {
      this.changeCoordinates(rowIndex, cellIndex + 1, rowIndex, cellIndex);
    } else if (rowIndex > 0 && this.state.gameData[rowIndex - 1][cellIndex] === 0) {
      this.changeCoordinates(rowIndex - 1, cellIndex, rowIndex, cellIndex);
    }
  }

  changeCoordinates(spaceRow, spaceCell, targetRow, targetCell) {
    this.setState(state => {
      let gameData = state.gameData;
      gameData[spaceRow][spaceCell] = gameData[targetRow][targetCell];
      gameData[targetRow][targetCell] = 0;
      return {
        gameData
      };
    });
  }

  isGameFinished() {
    const currentState = this.state.gameData.reduce((a, b) => a.concat(b));
    const initialState = this.state.initialGameData;
    return (initialState.every(function (row, index) {
      return initialState[index] === currentState[index];
    }))
  }

  renderGameData() {
    return this.state.gameData.map((row, index) => {
      return (
        <tr key={index}>
          {row.map((cell, index, row) => {
            return (
              <td key={index} onClick={(_ => this.onItemClick(row, index))}>{cell !== 0 ? cell : ''}</td>
            )
          })}
        </tr>
      )
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.isGameFinished() && this.state.gameStarted && !this.state.gameFinished) {
      this.setState(_ => ({
        gameFinished: true
      }))
    }
  }

  render() {
    return (
      <div>
        {!this.state.gameStarted &&
        <StartMenu setGameDimension={this.setGameDimension}/>
        }
        {!this.state.gameFinished && this.state.gameStarted &&
        <table>
          <tbody>
          {this.renderGameData()}
          </tbody>
        </table>
        }
        {this.state.gameFinished && this.state.gameStarted &&
        <WinnerMessage/>
        }
      </div>
    )
  }
}

export default GameBody