import React, { Component } from 'react';

class Message extends Component {
	render() {
		const cssClass = `alert alert-${this.props.cssClass} alert-dismissible fade show`
		return (
			<div className={cssClass} role="alert">
				{this.props.text}
				<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
		)
	}
}

export default Message;