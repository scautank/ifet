import React from 'react';

class Title extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<h1 className="title">{this.props.title}</h1>);
	}
}

Title.defaultProps = {
	title: ''
}

Title.propTypes = {
	title: React.PropTypes.string
}

export default Title;