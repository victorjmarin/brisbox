// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-file.js.
import { name as packageName } from "meteor/autoform-file";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-file - example', function (test) {
  test.equal(packageName, "autoform-file");
});
