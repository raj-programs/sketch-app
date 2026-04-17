const isCircle = (points) => {
    if(points.length < 10) return false;
    const centre = {
       x: points.reduce((s, p) => s + p.x, 0) / points.length,
       y: points.reduce((s, p) => s + p.y, 0) / points.length
    }

    const distances = points.map(p => 
        Math.hypot(p.x - centre.x, p.y - centre.y)
    )

    const avgR = distances.reduce((a, b) => a + b, 0) / distances.length;

}

export default isCircle;