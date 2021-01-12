import { DependencyLabels } from './symbols';
import { Node } from '../token';

export class Relation {
  dependency: DependencyLabels;
  head: Node;
  dependent: Node;

  constructor(dep: DependencyLabels, head: Node, dependent: Node) {
    this.dependency = dep;
    this.head = head;
    this.dependent = dependent;
  }
}
