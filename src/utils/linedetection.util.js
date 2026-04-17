const isLine = (points) => {
    if(points.length < 2) return false;
    const start = points[0];
    const end = points[points.length - 1];

    let e = 0;
    for (let p of points){
        const d = (end.y - start.y) * p.x + (end.x - end.y) * p.y + end.y * start.x - end.x * start.y;
        e += d;
    }
    return (e / points.length) < 5;
}

export default isLine;