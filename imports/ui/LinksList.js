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
            links: [],
            totalLinks: 0,
            visibleLinks: [],
            hiddenLinks: []
        };
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe("links");
            const links = Links.find({}).fetch();
            // const links = Links.find({
            //     visible: Session.get("showVisible")
            // }).fetch();
            let visibleLinks = [];
            let hiddenLinks = [];
            let totalLinks = links.length;
            for (i = 0; i < links.length; i++) {
                console.log(links[i]);
                if (links[i].visible === true) {
                    visibleLinks.push(links[i]);
                } else {
                    hiddenLinks.push(links[i]);
                }
            }
            Session.set("countVisible", visibleLinks.length);
            Session.set("countHidden", hiddenLinks.length);
            this.setState({ links, totalLinks, visibleLinks, hiddenLinks });
        });
    }

    componentWillUpdate() {}

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        if (Session.get("showVisible")) {
            return this.state.visibleLinks.map(link => {
                let absURL = Meteor.absoluteUrl(link._id);
                return <LinkListItem key={link._id} absURL={absURL} {...link} />;
            });
        } else {
            return this.state.hiddenLinks.map(link => {
                let absURL = Meteor.absoluteUrl(link._id);
                return <LinkListItem key={link._id} absURL={absURL} {...link} />;
            });
        }
    }
    render() {
        console.log(this.state.links);
        return <div>{this.renderLinksListItems()}</div>;
    }
}
