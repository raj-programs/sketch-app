const isCircle = (points) => {
    if (points.length < 10) return false;

    const centre = {
        x: points.reduce((s, p) => s + p.x, 0) / points.length,
        y: points.reduce((s, p) => s + p.y, 0) / points.length
    };

    const distances = points.map(p =>
        Math.hypot(p.x - centre.x, p.y - centre.y)
    );

    const avgR = distances.reduce((a, b) => a + b, 0) / distances.length;

    const variance = distances.reduce(
        (sum, b) => sum + Math.pow(b - avgR, 2),
        0
    ) / distances.length;

    const stdev = Math.sqrt(variance);
    const threshold = avgR * 0.5;

    const first = points[0];
    const last = points[points.length - 1];

    const isClosed =
        Math.hypot(first.x - last.x, first.y - last.y) < avgR * 0.5;
    return stdev < threshold && isClosed;
};

export default isCircle;