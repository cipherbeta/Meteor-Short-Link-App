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
                    <div
                        style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <p
                            className="text-primary"
                            style={{
                                margin: 0,
                                padding: 0,
                                fontSize: 24
                            }}
                        >
                            {this.props.url}
                        </p>
                    </div>
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
                        <a
                            href={this.props.absURL}
                            target="_blank"
                            className="btn btn-primary tooltip"
                            data-tooltip="Visit your shortened URL."
                        >
                            Visit
                        </a>
                        <button
                            className={
                                "btn tooltip " + (this.state.justCopied ? "btn-success" : "")
                            }
                            ref="copyButton"
                            data-tooltip="Copy the shortened link to the clipboard."
                            data-clipboard-text={this.props.absURL}
                        >
                            {this.state.justCopied ? "Copied" : "Copy"}
                        </button>
                        <button
                            className="btn tooltip"
                            data-tooltip="Hide the link, but keep it active."
                            onClick={() => {
                                Meteor.call(
                                    "links.setVisibility",
                                    this.props._id,
                                    !this.props.visible
                                );
                            }}
                        >
                            {this.props.visible ? "Hide" : "Unhide"}
                        </button>
                        <button
                            className="btn btn-error tooltip"
                            data-tooltip="Permanently delete this link."
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
