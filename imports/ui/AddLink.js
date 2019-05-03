import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

export default class AddLink extends Component {
    onSubmit(e) {
        e.preventDefault();
        const url = this.refs.url.value.trim();
        console.log(url);
        if (!!url) {
            Meteor.call("links.insert", url);
            this.refs.url.value = "";
        }
    }
    render() {
        return (
            <form className="form-group" onSubmit={this.onSubmit.bind(this)}>
                <label
                    className="form-label text-uppercase"
                    style={{ fontSize: ".75em", marginBottom: -8 }}
                    htmlFor="url-input"
                >
                    Input URL (must be a valid url)
                </label>
                <div className="input-group">
                    <input
                        type="text"
                        ref="url"
                        id="url-input"
                        placeholder="https://example.com"
                        className="form-input"
                    />
                    <button className="btn btn-primary">Add Link</button>
                </div>
            </form>
        );
    }
}
