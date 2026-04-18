export const drawShape = (ctx, shape) => {
    if (!shape) return;

    ctx.beginPath();
    ctx.strokeStyle = shape.color || "black";
    ctx.lineWidth = 3;

    switch (shape.type) {

        case "line":
            ctx.moveTo(shape.start.x, shape.start.y);
            ctx.lineTo(shape.end.x, shape.end.y);
            break;

        case "circle":
            ctx.arc(
                shape.center.x,
                shape.center.y,
                shape.radius,
                0,
                Math.PI * 2,
                false
            );
            break;

        case "freehand":
            if (!shape.points || shape.points.length < 2) break;

            ctx.moveTo(shape.points[0].x, shape.points[0].y);

            for (let i = 1; i < shape.points.length; i++) {
                ctx.lineTo(shape.points[i].x, shape.points[i].y);
            }
            break;
    }

    ctx.stroke();
};