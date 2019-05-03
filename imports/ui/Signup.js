import React from "react";
import { Link } from "react-router";
import { Accounts } from "meteor/accounts-base";

export default class Signup extends React.Component {
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

        if (password.length < 9) {
            return this.setState({ error: "Password must be more than 8 characters long" });
        }

        Accounts.createUser({ email, password }, err => {
            if (err) {
                this.setState({ error: err.reason });
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
                    <h1>Join Short Lnk</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form
                        onSubmit={this.onSubmit.bind(this)}
                        noValidate
                        style={{ minWidth: "30vw" }}
                    >
                        <input
                            type="email"
                            ref="email"
                            name="email"
                            placeholder="Email"
                            className="form-input input-lg"
                        />
                        <input
                            type="password"
                            ref="password"
                            name="password"
                            placeholder="Password"
                            className="form-input input-lg"
                            style={{ marginTop: 8 }}
                        />
                        <button className="btn btn-primary" style={{ marginTop: 8, width: "100%" }}>
                            Create Account
                        </button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}
