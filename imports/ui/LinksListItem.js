import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Clipboard from "clipboard";
import PropTypes from "prop-types";

export default class LinkListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copyButton);

        this.clipboard
            .on("success", () => {
                this.setState({ justCopied: true });
                setTimeout(() => this.setState({ justCopied: false }), 1500);
            })
            .on("error", e => {
                alert(
                    "Unable to copy. This is most likely due to permission issues on your browser. Please copy the link manually.",
                    e
                );
            });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }
    render() {
        return (
            <div className="panel" style={{ marginBottom: 8 }}>
                <div className="panel-header">
                    <p className="text-primary" style={{ margin: 0, padding: 0, fontSize: 24 }}>
                        {this.props.url}
                    </p>
                </div>
                <div className="panel-body">
                    <p>
                        Short URL: {this.props.absURL}
                        <br />
                        <span className="text-gray">
                            0 visits {this.props.visible ? "" : "|| Link Hidden"}
                        </span>
                    </p>
                </div>
                <div className="panel-footer">
                    <div className="btn-group btn-group-block">
                        <a href={this.props.absURL} target="_blank" className="btn btn-primary">
                            Visit
                        </a>
                        <button
                            className={"btn " + (this.state.justCopied ? "btn-success" : "")}
                            ref="copyButton"
                            data-clipboard-text={this.props.absURL}
                        >
                            {this.state.justCopied ? "Copied" : "Copy"}
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                Meteor.call(
                                    "links.setVisibility",
                                    this.props._id,
                                    !this.props.visible
                                );
                            }}
                        >
                            Hide
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                Meteor.call("links.deleteLink", this.props._id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

LinkListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    absURL: PropTypes.string.isRequired
};
