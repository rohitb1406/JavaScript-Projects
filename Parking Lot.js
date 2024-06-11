class ParkingLot {
    constructor(slots) {
        this.slots = new Array(slots).fill(null);
    }

    park(carId) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] === null) {
                this.slots[i] = carId;
                return true;
            }
        }
        return false;
    }

    getSlots() {
        return this.slots;
    }

    remove(carId) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] === carId) {
                this.slots[i] = null;
                return true;
            }
        }
        return false;
    }
}

function main() {
    const fs = require('fs');
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const numberOfSlots = parseInt(readLine().trim());
    const parkingLotObj = new ParkingLot(numberOfSlots);

    ws.write(`Parking Lot created with number of slots as ${numberOfSlots}\n`);

    let numberOfOperations = parseInt(readLine().trim());

    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const operation = inputs[0];
        const carId = inputs[1];

        switch (operation) {
            case 'Park':
                if (parkingLotObj.park(carId)) {
                    ws.write(`Parking Started: ${carId}\n`);
                } else {
                    ws.write(`Parking Full: ${carId}\n`);
                }
                break;

            case 'Remove':
                if (parkingLotObj.remove(carId)) {
                    ws.write(`Car id ${carId} removed from parking\n`);
                } else {
                    ws.write(`Car: ${carId} not found\n`);
                }
                break;

            case 'GetSlots':
                const status = parkingLotObj.getSlots();
                status.forEach((obj, i) => {
                    if (obj) {
                        ws.write(`Parked at slot ${i + 1}: ${obj}\n`);
                    } else {
                        ws.write(`Slot ${i + 1} is empty\n`);
                    }
                });
                break;

            default:
                break;
        }
    }
    ws.end();
}
