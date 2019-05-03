import React from "react";
import { Link } from "react-router";
import { Meteor } from "meteor/meteor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }
    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({ email }, password, err => {
            if (err) {
                this.setState({ error: "Unable to login. Check email and password." });
            } else {
                this.setState({ error: "" });
            }
        });
    }
    render() {
        return (
            <div className="columns">
                <div
                    className="column col-12"
                    style={{
                        minHeight: "100vh",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h1 style={{ textAlign: "center" }}>
                        <FontAwesomeIcon icon="link" size="2x" className="text-primary" />
                        <br />
                        Short Lnk
                    </h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form
                        onSubmit={this.onSubmit.bind(this)}
                        noValidate
                        style={{ minWidth: "30vw", marginBottom: 8 }}
                    >
                        <div className="form-group" style={{ textAlign: "center" }}>
                            <input
                                type="email"
                                ref="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="form-input input-lg"
                            />
                            <input
                                type="password"
                                ref="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="form-input input-lg"
                                style={{ marginTop: 8 }}
                            />
                            <button
                                className="btn btn-primary"
                                style={{ marginTop: 8, width: "100%" }}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}
