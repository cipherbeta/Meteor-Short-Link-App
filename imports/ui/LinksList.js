import React from "react";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";
import { Links } from "../api/links";
import LinkListItem from "./LinksListItem";

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe("links");
            const links = Links.find({
                visible: Session.get("showVisible")
            }).fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        return this.state.links.map(link => {
            let absURL = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} absURL={absURL} {...link} />;
        });
    }
    render() {
        console.log(this.state.links);
        return <div>{this.renderLinksListItems()}</div>;
    }
}
