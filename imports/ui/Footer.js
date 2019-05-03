import React from "react";

const Footer = () => (
    <div className="columns">
        <div
            className="column"
            style={{
                height: "4em",
                display: "flex",
                flexDirection: "center",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            <p>
                Developed by{" "}
                <a href="https://doud.dev" target="_blank">
                    Isaac Doud
                </a>{" "}
                using{" "}
                <a href="https://www.meteor.com/" target="_blank">
                    MeteorJS
                </a>
                .<br />
                <span className="text-gray" style={{ fontSize: 12 }}>
                    {" "}
                    Check out the Github to host your own.
                </span>
            </p>
        </div>
    </div>
);

export default Footer;
