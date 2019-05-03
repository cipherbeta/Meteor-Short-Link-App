import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel, faSearch, faEye, faLink } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faEye, faLink);

import "../imports/startup/simple-schema-config";
import "spectre.css/dist/spectre.min.css";

import { routes, onAuthChange } from "../imports/routes/routes";

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    Session.set("showVisible", true);
    ReactDOM.render(routes, document.getElementById("app"));
});
