/**
 * Created by thomas on 4/3/15.
 */

export class Waypoint {
    constructor(public name: string, public lat: number, public lon: number) {
    }

    description() {
        return this.name + ': Lat: ' + this.lat.toFixed(4) + ', Lon: ' + this.lon.toFixed(4);
    }
}

export class GreatCircle {
    constructor(public wpt1: Waypoint, public wpt2: Waypoint) {
    }

    static toDegrees(radians: number) {
        return radians * 180 / Math.PI;
    }

    static toRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    distance(): number {
        let radius = 3440; // Earths radius nm.

        let dLat = GreatCircle.toRadians(this.wpt2.lat - this.wpt1.lat);
        let dLon = GreatCircle.toRadians(this.wpt2.lon - this.wpt1.lon);
        let lat1 = GreatCircle.toRadians(this.wpt1.lat);
        let lat2 = GreatCircle.toRadians(this.wpt2.lat);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) *
            Math.cos(lat1) * Math.cos(lat2);

        let c = 2 * Math.asin(Math.sqrt(a));

        return radius * c;
    }

    bearing(): number {
        let dLon = GreatCircle.toRadians(this.wpt2.lon - this.wpt1.lon);
        let lat1 = GreatCircle.toRadians(this.wpt1.lat);
        let lat2 = GreatCircle.toRadians(this.wpt2.lat);

        let y = Math.sin(dLon) * Math.cos(lat2);
        let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        let brng = Math.atan2(y, x);

        return this.toBearing(brng);
    }

    description(): string {
        return 'Distance ' + this.wpt1.name + ' to ' + this.wpt2.name + ' is ' + this.distance().toFixed(1) +
            ' nm Bearing ' + this.bearing().toFixed(1) + ' T';
    }

    // Description the position and name of wpt1.
    wpt1Description(): string {
        return this.wpt1.description();
    }

    // Description the position and name of wpt2.
    wpt2Description(): string {
        return this.wpt2.description();
    }

    // Return a true bearing from an angle in this.toRadians.
    private toBearing(radians: number) {
        let brng = GreatCircle.toDegrees(radians) + 360 % 360;
        let compass: number;

        if (brng < 0) {
            compass = 360 + brng;
        } else {
            compass = brng;
        }

        return compass;
    }

}

export class Route {
    private _legs: Array<GreatCircle> = [];
    
    addLeg(leg: GreatCircle): void {
        this._legs.push(leg);
    }
    
    clearLegs(): void {
        this._legs = [];    
    }
    
    computeRouteDistance(): number {
        let totalDistance = 0;
    
        for (let leg of this._legs) {
            totalDistance += leg.distance();
        }    
        
        return totalDistance;
    }
    
    listLegs(): void {
        for (let leg of this._legs) {
            console.log(leg.description());
        }
    }
}
