class Room {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get character() {
        return this._character
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }

    describe() {
        return "Looking around the " + this._name + " you can see " + this._description;
    }


    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }


    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = []
        for (const [direction, room] of entries) {
            let text = " The " + room._name + " is to the " + direction;
            details.push(text);
        }
        return details;
    }


    //method to move to a new room
    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way",);
            alert(this._name)
            return this;
        }
    }
}

class Item {
    constructor(name) {
        this._name = name,
            this._description = ""
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._name = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }


    describe() {
        return "The " + this._name + " is " + this._description;
    }


}

class Character {
    constructor(name) {
        this._name = name,
            this._description = ""
        this._conversation = ""
    }
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }


    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

class Enemy extends Character {
    constructor(name) {
        super(name);
        this._weakness = "";
    }

    set weakness(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._weakness = value;
    }


    fight(item) {
        if (item = this_weakness) {
            return true;
        } else {
            return false;
        }
    }

}

//create the indiviual room objects and add their descriptions
const Room1 = new Room("Room1");
Room1.description = "a large room with sofa in the middle";
const Room2 = new Room("Room2");
Room2.description = "a small dark room with broken glass on the floor";
const Room3 = new Room("Room3");
Room3.description = "a tiny room with a light bulb on the ground";
const Room4 = new Room("Room4");
Room4.description = "a main room with a 2 large televisions";

//link the rooms together
Room1.linkRoom("south", Room2);
Room1.linkRoom("east", Room4);
Room2.linkRoom("north", Room1);
Room2.linkRoom("east", Room3);
Room3.linkRoom("west", Room2);
Room3.linkRoom("north", Room4);
Room4.linkRoom("south", Room3);
Room4.linkRoom("west", Room1);

//add characters
const Wolfy = new Enemy("Wolfy");
Wolfy.conversation = "aghrrr humans";
Wolfy.description = "a scary Wolf";
Wolfy.pronoun = "he";
Wolfy.weakness = "garlic";


// add characters to rooms
Room1.character = Wolfy;


function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
        occupantMsg = ""
    } else {
        occupantMsg = room.character.describe() + ". " + room.character.converse()
    }

    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
        occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}


function startGame() {
    //set and display start room
    currentRoom = Room1
    displayRoomInfo(currentRoom);

    //

    //handle commands
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;
            const directions = ["north", "south", "east", "west"]
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command)
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("usertext").value = ""
                alert("that is not a valid command please try again")
            }

        }
    });
}