'use strict';

function Employee(title) {
    this.title = title;
}

Employee.prototype.setTitle = function(title) {
    this.title = title;
};

Employee.prototype.getTitle = function() {
    return this.title;
};

function Engineer(title, isManager) {
    // Call the parent constructor
    Employee.call(this, title);
    this.isManager = isManager;
}

// Inherit from Employee
Engineer.prototype = Object.create(Employee.prototype);
Engineer.prototype.constructor = Engineer;

Engineer.prototype.setIsManager = function(isManager) {
    this.isManager = isManager;
};

Engineer.prototype.getIsManager = function() {
    return this.isManager;
};

function main() {
    const fs = require('fs');
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    var inputs = readLine().split(' ');
    var engineerObject = new Engineer(inputs[0], inputs[1].toLowerCase() === 'true');

    ws.write(`Initial Employee Profile - Title is ${engineerObject.getTitle()}. ${engineerObject.getIsManager() ? 'Is' : 'Is not'} a Manager\n`);

    engineerObject.setTitle(readLine());
    engineerObject.setIsManager(readLine().toLowerCase() === 'true');

    ws.write(`Final Employee Profile - Title is ${engineerObject.getTitle()}. ${engineerObject.getIsManager() ? 'Is' : 'Is not'} a Manager\n`);
    ws.write(`Engineer.prototype has property setTitle: ${Engineer.prototype.hasOwnProperty('setTitle')}\n`);
    ws.write(`Engineer.prototype has property getTitle: ${Engineer.prototype.hasOwnProperty('getTitle')}\n`);
    ws.write(`Engineer.prototype has property setIsManager: ${Engineer.prototype.hasOwnProperty('setIsManager')}\n`);
    ws.write(`Engineer.prototype has property getIsManager: ${Engineer.prototype.hasOwnProperty('getIsManager')}\n`);

    ws.end();
}
