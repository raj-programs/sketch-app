export const drawShape = (ctx, shape) => {
    ctx.beginPath();

    const pts = shape.points;
    if (!pts || pts.length === 0) return;

    ctx.moveTo(pts[0].x, pts[0].y);

    for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
    }

    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
};