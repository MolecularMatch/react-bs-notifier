var React = require("react");
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
require("./styles.less");

var AlertsNotifier = React.createClass({displayName: "AlertsNotifier",
	propTypes: {
		alerts: React.PropTypes.array.isRequired,
		onDismiss: React.PropTypes.func
	},
	getInitialState: function () {
		return {
			dismissedAlerts: []
		};
	},
	dismiss: function(item) {
		if (this.props.onDismiss) {
			//if callback specified, call it
			this.props.onDismiss(item);
		} else {
			//if no callback for dismissal, just update our state
			var newData = this.state.dismissedAlerts.slice();
			newData.push(item);
			this.setState({ dismissedAlerts: newData });
		}
	},
	render: function () {
		var alerts = [];
		for (var i = 0; i < this.props.alerts.length; i++) {
			if (this.state.dismissedAlerts.indexOf(this.props.alerts[i]) < 0) {
				alerts.push(this.props.alerts[i]);
			}
		}

		i = -1;
		return (
			React.createElement("div", {className: "alert-notifier-container"}, 
				React.createElement(ReactCSSTransitionGroup, {transitionName: "alert"}, 
					alerts.map(function (item) {
						i++;

						if (["success", "info", "warning", "danger"].indexOf(item.type) < 0) {
							item.type = "info";
						}

						var css = "alert alert-dismissible alert-" + item.type;
						var headline = item.headline ? React.createElement("strong", null, item.headline, " ") : null;

						return (
							React.createElement("div", {className: css, key: i}, 
								React.createElement("button", {type: "button", className: "close", title: "Dismiss", onClick: this.dismiss.bind(this, item)}, "×"), 
								headline, item.message
							)
						);
					}.bind(this))
				)
			)
		);
	}
});

module.exports = AlertsNotifier;
