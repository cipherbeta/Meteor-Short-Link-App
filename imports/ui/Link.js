import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Links } from "../api/links";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import LinksList from "./LinksList";
import LinkListFilters from "./LinksListFilters";
import Footer from "./Footer";
import { Meteor } from "meteor/meteor";

export default class Link extends React.Component {
    onLogout() {
        Accounts.logout();
    }

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
            <div className="columns" style={{ alignItems: "center", justifyContent: "center" }}>
                <div className="column" style={{ maxWidth: 700 }}>
                    <PrivateHeader title="Short Lnk" subtitle="Version 0.1 Alpha" />
                    <AddLink />
                    <LinkListFilters />
                    <LinksList />
                    <Footer />
                </div>
            </div>
        );
    }
}
