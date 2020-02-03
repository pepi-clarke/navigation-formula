/**
 * Created by thomas on 4/4/15.
 */

// import nav = require('./navigation');
import {Waypoint, GreatCircle, Route} from './navigation';

// PSC Bequia and back the long way.
console.log('Waypoints:');

let beq = new Waypoint('BEQ Port Elizabeth', 13.0154, -61.2522);
console.log(beq.description());
let svgs = new Waypoint('SVG South', 13.1344, -61.2430);
console.log(svgs.description());
let svgm = new Waypoint('SVG Middle', 13.2220, -61.2903);
console.log(svgm.description());
let svgn = new Waypoint('SVG North', 13.3861, -61.2174);
console.log(svgn.description());
let slupitons = new Waypoint('SLU Pitons', 13.8120, -61.1196);
console.log(slupitons.description());
let slurodney = new Waypoint('SLU Rodney Bay', 14.0991, -60.9841);
console.log(slurodney.description());
let sluchannelNorth = new Waypoint('SLU Channel North', 14.3391, -60.8762);
console.log(sluchannelNorth.description());
let psc = new Waypoint('BGI Port St. Charles', 13.2624, -59.6459);
console.log(psc.description());
let deepWaterHarbour = new Waypoint('Deep water harbour', 13.109156,-59.64333);
console.log(deepWaterHarbour.description());

// Create a route.
let route = new Route();

route.addLeg(new GreatCircle(psc, beq));
route.addLeg(new GreatCircle(beq, svgs));
route.addLeg(new GreatCircle(svgs, svgm));
route.addLeg(new GreatCircle(svgm, svgn));
route.addLeg(new GreatCircle(svgn, slupitons));
route.addLeg(new GreatCircle(slupitons, slurodney));
route.addLeg(new GreatCircle(slurodney, sluchannelNorth));
route.addLeg(new GreatCircle(sluchannelNorth, psc));
route.addLeg(new GreatCircle(psc, deepWaterHarbour));

console.log('Legs Of Route::');
route.listLegs();

console.log('Total distance:', route.computeRouteDistance().toFixed(1), 'nm');
