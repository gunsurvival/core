export function discretizeEllipse({x, y, a, b, seg = Math.max(Math.floor(Math.sqrt(((a + b) / 2) * 20)), 8)}: {
	x: number;
	y: number;
	a: number;
	b: number;
	seg: number;
}) {
	const angle_shift = (Math.PI * 2) / seg;
	let phi = 0;
	const vertices = new Array<Vertex>(seg);
	for (let i = 0; i < seg; ++i) {
		phi += angle_shift;
		vertices.push({x: x + a * Math.cos(phi), y: y + b * Math.sin(phi)});
	}

	return vertices;
}

type Vertex = {
	x: number;
	y: number;
};
