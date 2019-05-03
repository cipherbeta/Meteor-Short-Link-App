import React from "react";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";
import { Links } from "../api/links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            Session.get("countVisible");
            Session.get("countHidden");
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
        return (
            <div>
                {this.state.links.length > 0 ? (
                    this.renderLinksListItems()
                ) : (
                    <div className="empty" style={{ background: "transparent" }}>
                        <div className="empty-icon">
                            <FontAwesomeIcon icon="unlink" size="3x" />
                        </div>
                        <p className="empty-title h5">You have no links.</p>
                        <p className="empty-subtitle">Add some links using the input above.</p>
                    </div>
                )}
            </div>
        );
    }
}
