import React from 'react';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hoverId: 0
		}
	}
	handleMouseOver(id, e) {
		this.setState({hoverId: id});
	}
	handleMouseOut(e) {
		this.setState({hoverId: 0});
	}
	render() {
		const that = this;
		return (
			<div className="list">
  				<ul>
  					{
  						this.props.list.map(function(item, index){
  							return (
  								<li key={index} onMouseOver={that.handleMouseOver.bind(that, index+1)} onMouseOut={that.handleMouseOut.bind(that)}>
  									<i className={that.state.hoverId === index+1 ? "active" : "default"}></i>
  									<span>{index + 1} ：{item}</span>
  								</li>
  							);
  						})
  					}
  				</ul>
  			</div>
  		);
	}
}

List.defaultProps = {
	list: []
}

List.propTypes = {
	list: React.PropTypes.array
}

export default List;