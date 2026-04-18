import isLine from "./linedetection.util.js"
import isCircle from "./circledetection.util.js";
import detectPolygon from "./detectPolygon.js";
function detectShape(stroke) {
    if(!stroke || !stroke.points) return null;
    const points = stroke.points;

    if (isCircle(points)) {
        const center = {
            x: points.reduce((s, p) => s + p.x, 0) / points.length,
            y: points.reduce((s, p) => s + p.y, 0) / points.length
        }

        const radius = points.reduce((s, p) => s + Math.hypot(p.x - center.x, p.y - center.y), 0) / points.length

        return {
            type: "circle",
            center, 
            radius, 
            color: stroke.color
        }
    }
    if (isLine(points)) {
        return {
            type: "line",
            start: points[0],
            end: points[points.length - 1],
            color: stroke.color
        }
    }

    const polygon = detectPolygon(points);
    if (polygon) {
        return {
            type: polygon.type,
            corners: polygon.fcorners,
            color: stroke.color
        }
    }
}

export default detectShape;