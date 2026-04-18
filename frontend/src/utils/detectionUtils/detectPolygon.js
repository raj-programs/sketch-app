const filterCloseCorners = (corners, minDist = 20) => {
    const result = [];

    for (let c of corners) {
        if (!result.some(r => Math.hypot(r.x - c.x, r.y - c.y) < minDist)) {
            result.push(c);
        }
    }

    return result;
};

const isClosed = (points) => {
    const first = points[0];
    const last = points[points.length - 1];

    return Math.hypot(first.x - last.x, first.y - last.y) < 30;
};


function detectPolygon (points){
    if(points.length < 20) return null;
    if (!isClosed(points)) return null;

    const corners = [];

    const getAngles = (p1, p2, p3) => {
        const a = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const b = Math.atan2(p3.y - p2.y, p3.x - p2.x);

        let angle = Math.abs(a - b);

        if(angle > Math.PI) angle = 2 * Math.PI - angle;
        return angle;
    }

    for(let i = 2; i < points.length - 2; i++){
        const angle = getAngles(points[i - 2], points[i], points[i + 2]);

        if(angle < 1.5){
            corners.push(points[i])
        }
    }

    const fcorners = filterCloseCorners(corners);

    if(fcorners.length === 3){
        console.log("Triangle");
        
        return {
            type: "triangle",
            corners: fcorners
        }
    }

    if(fcorners.length === 4){
         console.log("Rectangle");
        return{
            type: "rectangle",
            corners: fcorners
        }
    }
    return null;
    }

export default detectPolygon;