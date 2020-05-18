import React from 'react';

import pt from 'periodic-table';
import { rowCol } from './row-col-data';

const colors = {
  'Alkali metal': '#FF6666',
  'Alkaline earth metal': '#ffdead',
  'Lanthanide': '#ffbfff',
  'Actinide': '#ff99cc',
  'Transition metal': '#ffc0c0',
  'Post-transition metal': '#cccccc',
  'Metalloid': '#cccc99',
  'Reactive nonmetal': '#f0ff8f',
  'Noble gas': '#c0ffff',
  'Unknown': '#e8e8e8'
};

const width = 75;
const height = 80;
const margin = 3;
const border = 1;

export class PeriodicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { year: 2020 };
  }

  findEl(row, col) {
    return rowCol.filter(e => { return e.row === row && e.col === col })[0];
  }

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: (width + (border + margin) * 2) * 18}}>
        {[...Array(9).keys()].map(r => {
          return [...Array(18).keys()].map(c => {
            const found = this.findEl(r + 1, c + 1) || {};
            const data = found.symbol ? pt.symbols[found.symbol] : undefined;
            const year = data ? data.yearDiscovered : undefined;
            const visible = data && (year <= this.state.year || year === 'Ancient');

            return <div style={{width, height, margin, borderWidth: border, borderStyle: 'solid', borderColor: data ? '#ccc' : 'transparent', backgroundColor: visible ? colors[found.category] : undefined}}>
              {visible ? <div style={{overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%', width: '100%'}}>
                <div style={{fontSize: 12}}>{data.name}</div>
                <div style={{fontSize: 13}}>{data.atomicNumber}</div>
                <div style={{fontSize: 15, fontWeight: 'bold'}}>{data.symbol}</div>
                <div style={{fontSize: 12}}>{Number.parseFloat(data.atomicMass).toFixed(3)}</div>
              </div>
              : null }
            </div>
          })
        })}

        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <label>1</label>
          <input type="range" min="1" max="2020" value={this.state.year} onChange={e => this.setState({year: e.target.value})} style={{ margin: 10, width :'80%' }}/>
          <label>2020</label>
        </div>
        <div style={{width: '100%'}}>{this.state.year}</div>
      </div>
    );
  }
}