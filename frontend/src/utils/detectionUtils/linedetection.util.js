function isLine (points){
    if (points.length < 2) return false;

    const start = points[0];
    const end = points[points.length - 1];

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    const length = Math.hypot(dx, dy);
    
    if (length === 0) return false;
    let totalError = 0;
    for (let p of points) {
        const distance =
            Math.abs(dy * p.x - dx * p.y + end.x * start.y - end.y * start.x) / length;
        totalError += distance;
    }
    const avgError = totalError / points.length;
    return avgError < 5;
};

export default isLine;