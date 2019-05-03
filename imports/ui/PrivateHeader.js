import React from "react";
import { Accounts } from "meteor/accounts-base";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrivateHeader = props => {
    const onLogout = () => {
        Accounts.logout();
    };
    return (
        <nav className="navbar">
            <section className="navbar-section">
                <a className="navbar-brand mr-2 text-uppercase">
                    <FontAwesomeIcon icon="link" /> {props.title}
                </a>
                <a className="text-gray" style={{ fontSize: 12 }}>
                    {props.subtitle}
                </a>
            </section>
            <section className="navbar-section">
                <p />
                <button className="btn btn-link" onClick={onLogout}>
                    Log Out
                </button>
            </section>
        </nav>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default PrivateHeader;
