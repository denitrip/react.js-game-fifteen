import React from 'react';
import Select from 'react-select';

class StartMenu extends React.Component {

  render() {

    const gameDimensions = [
/*      {
        label: 'two',
        value: '2'
      },*/
      {
        label: 'three',
        value: '3'
      },
      {
        label: 'four',
        value: '4'
      },
      {
        label: 'five',
        value: '5'
      },
      {
        label: 'six',
        value: '6'
      }];

    return (
      <div>
        <label className={"dimension-label"}>Choose game dimension</label><br/>
        <Select options={gameDimensions} onChange={this.props.setGameDimension} />
      </div>
    )
  }
}

export default StartMenu