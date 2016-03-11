import './sass/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import listStore from '../../stores/app/listStore';
import Title from '../../components/title/index';
import List from '../../components/list/index';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}
	componentDidMount() {
		this.setState({list: listStore});
	}
	render() {
		return (
			<div>
				<Title title="This is App Page." />
				<List list={this.state.list} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('container'));