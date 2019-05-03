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

    handleSearchOpen() {
        this.setState({ isSearching: true });
    }

    handleSearchClose() {
        this.setState({ searchValue: "", isSearching: false });
    }

    handleSearchTermChange(e) {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
    }

    render() {
        console.log("Current State: ", this.state.showingVisible);
        return (
            <div>
                {this.state.isSearching ? (
                    <div className="has-icon-right">
                        <input
                            className="form-input"
                            type="text"
                            ref="searchInput"
                            style={{ marginBottom: 8, textAlign: "center" }}
                            placeholder="Search for a phrase/url. NOT HOOKED UP YET!!!!!!"
                            onChange={e => this.handleSearchTermChange(e)}
                        />
                        <FontAwesomeIcon
                            icon="times"
                            className="form-icon"
                            onClick={this.handleSearchClose.bind(this)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                ) : (
                    <div className="btn-group btn-group-block" style={{ marginBottom: 8 }}>
                        <button
                            onClick={this.handleVisibilityViewChange.bind(this)}
                            className={"btn " + (this.state.showingVisible ? "" : "btn-primary")}
                        >
                            {this.state.showingVisible ? (
                                <span>
                                    <FontAwesomeIcon icon="eye-slash" /> View Hidden (
                                    {Session.get("countHidden")})
                                </span>
                            ) : (
                                <span>
                                    <FontAwesomeIcon icon="eye" /> View Visible (
                                    {Session.get("countVisible")})
                                </span>
                            )}
                        </button>
                        <button className="btn" onClick={this.handleSearchOpen.bind(this)}>
                            <FontAwesomeIcon icon="search" /> Search Links
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
