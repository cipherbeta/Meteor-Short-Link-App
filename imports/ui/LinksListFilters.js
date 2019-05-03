import React, { Component } from "react";
import { Session } from "meteor/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ChangeVisible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingVisible: true,
            isSearching: false,
            searchValue: ""
        };
    }

    componentWillMount() {
        let showingVisible = Session.get("showVisible");
        this.setState({ showingVisible });
    }

    componentDidUpdate() {
        if (this.state.isSearching) {
            this.refs.searchInput.focus();
        }
    }

    handleVisibilityViewChange() {
        Session.set("showVisible", !Session.get("showVisible"));
        let showingVisible = Session.get("showVisible");
        this.setState({ showingVisible });
    }

    handleSearchViewChange() {
        this.setState({ isSearching: !this.state.isSearching });
    }

    handleSearchTermChange(e) {
        e.preventDefault();
        console.log(e);
        if (e.key === "Escape") {
            this.handleSearchViewChange();
        }
    }

    render() {
        console.log("Current State: ", this.state.showingVisible);
        return (
            <div>
                {this.state.isSearching ? (
                    <input
                        className="form-input"
                        type="text"
                        ref="searchInput"
                        style={{ marginBottom: 8, textAlign: "center" }}
                        placeholder="Search for a phrase/url."
                        onChange={e => this.handleSearchTermChange(e)}
                    />
                ) : (
                    <div className="btn-group btn-group-block" style={{ marginBottom: 8 }}>
                        <button
                            onClick={this.handleVisibilityViewChange.bind(this)}
                            className={"btn " + (this.state.showingVisible ? "" : "btn-primary")}
                        >
                            {this.state.showingVisible ? (
                                <span>
                                    <FontAwesomeIcon icon="eye-slash" /> View Hidden Links (
                                    {Session.get("countHidden")})
                                </span>
                            ) : (
                                <span>
                                    <FontAwesomeIcon icon="eye" /> Back to Visible Links (
                                    {Session.get("countVisible")})
                                </span>
                            )}
                        </button>
                        <button className="btn" onClick={this.handleSearchViewChange.bind(this)}>
                            <FontAwesomeIcon icon="search" /> Search Links
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
