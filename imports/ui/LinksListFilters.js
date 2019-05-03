import React, { Component } from "react";
import { Session } from "meteor/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ChangeVisible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingVisible: true,
            isSearching: false
        };
    }

    componentWillMount() {
        let showingVisible = Session.get("showVisible");
        this.setState({ showingVisible });
    }
    handleVisibilityViewChange() {
        Session.set("showVisible", !Session.get("showVisible"));
    }

    render() {
        console.log("Current State: ", this.state.showingVisible);
        return (
            <div className="btn-group btn-group-block" style={{ marginBottom: 8 }}>
                <button onClick={this.handleVisibilityViewChange} className={"btn"}>
                    <FontAwesomeIcon icon="eye" /> View Hidden Links
                </button>
                <button className="btn">
                    <FontAwesomeIcon icon="search" /> Search Links
                </button>
            </div>
        );
    }
}
