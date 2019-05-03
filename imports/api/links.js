import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import shortid from "shortid";

export const Links = new Mongo.Collection("links");
// Links string below does not refer to the mongo collection
if (Meteor.isServer) {
    // uses es5 publish for this.userId
    Meteor.publish("links", function() {
        return Links.find({ userId: this.userId });
    });
}

Meteor.methods({
    "links.insert"(url) {
        // Check is user is logged in
        if (!this.userId) {
            throw new Meteor.Error("not-authorized", "User is not logged in.");
        }

        // Test URL for validity

        new SimpleSchema({
            url: {
                label: "Your link",
                type: String,
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        // Insert proper user
        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true
        });
    },
    "links.setVisibility"(_id, visible) {
        if (!this.userId) {
            throw new Meteor.Error("not-authorized", "User is not logged in.");
        }

        // Validate ID is formatted appropriately
        new SimpleSchema({
            _id: {
                type: String,
                label: "Link ID",
                min: 1
            },
            visible: {
                type: Boolean,
                label: "Link is visible"
            }
        }).validate({ _id, visible });

        Links.update(
            { _id, userId: this.userId },
            {
                $set: {
                    visible
                }
            }
        );
    },
    "links.deleteLink"(_id) {
        if (!this.userId) {
            throw new Meteor.Error("not-authorized", "User is not logged in");
        }

        new SimpleSchema({
            _id: {
                type: String,
                label: "Link ID",
                min: 1
            }
        }).validate({ _id });

        Links.remove({ _id, userId: this.userId });
    }
});
