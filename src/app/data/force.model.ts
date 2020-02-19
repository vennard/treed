
export class Node implements d3.SimulationNodeDatum {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount: number = 0;

  constructor(id) {
    this.id = id;
  }
}

export class Link implements d3.SimulationLinkDatum<Node> {
  index?: number;

  source: Node | string | number;
  target: Node | string | number;

  constructor(source, target) {
    this.source = source;
    this.target = target;
  }
}

export class Force {
  nodes: Node[];
  links: Link[];
}