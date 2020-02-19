import { Component, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import { Force, Node, Link } from '../data/force.model';
import { Simulation } from 'd3';

@Component({
  selector: 'app-force-tree',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './force-tree.component.html',
  styleUrls: ['./force-tree.component.sass']
})
export class ForceTreeComponent implements OnChanges {
  error: any;

  @ViewChild('forcect')
  private forceContainer: ElementRef;

  @Input() data: Force;

  public constructor() {};
  margin = {top: 20, right: 20, bottom: 30, left: 40};

  ngOnChanges() {
    if (!this.data) { return; }
    this.createTree();
  }

  private createTree(): void {
    d3.select('svg').remove();

    const element = this.forceContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth) 
      .attr('height', element.offsetHeight);
    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const nodes = data.nodes;
    const links = data.links;

    let i = 0;
    let simulation: Simulation<Node, Link>;
    simulation = d3.forceSimulation<Node, Link>()
      .nodes(data.nodes)
      .force("link", d3.forceLink().id((d) => d['id']))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(contentWidth / 2, contentHeight / 2));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
        .data(links)
        .enter().append('line');

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
          .attr('r', 3.5)
          .attr('fill', d => color(d['group']))
        .on("mouseover", (d) => {
          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
          tooltip.html((d) => d['id'])
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY) + 'px');
        })
        .call(d3.drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded));

    node.append('title')
      .text(d => d['id']);

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation
      .force<d3.ForceLink<Node, Link>>('link')
      .links(data.links);

    function ticked() {
      link
        .attr('x1', d => d.source['x'])
        .attr('y1', d => d.source['y'])
        .attr('x2', d => d.target['x'])
        .attr('y2', d => d.target['y']);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    function dragStarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragEnded(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }
}
