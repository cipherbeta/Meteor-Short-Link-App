import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import "../imports/startup/simple-schema-config";
import "../imports/api/users";
import { Links } from "../imports/api/links";

Meteor.startup(() => {
    console.log("Meteor server started.");
    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const link = Links.findOne({ _id });
        console.log(link);

        if (link) {
            res.statusCode = 302;
            res.writeHead(302, { Location: link.url });
            console.log(`Redirecting to ${link.url}`);
            res.end();
        } else {
            next();
        }
    });
});
