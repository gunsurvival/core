import type {Circle, Ellipse, Polygon, Box, Line, Point} from 'detect-collisions';

export type MouseState = {
	left: boolean;
	middle: boolean;
	right: boolean;
};

export type TickData = {
	accumulator: number;
	elapsedMs: number;
	deltaMs: number;
	delta: number;
};
