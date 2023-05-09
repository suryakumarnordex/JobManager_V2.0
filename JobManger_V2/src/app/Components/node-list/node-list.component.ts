import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { HpcNode } from '../../Models/hpc-node';
import { ClrDatagridSortOrder } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: [],
})
export class NodeListComponent implements OnInit {
  nodesLoading = false;
  stateChangeActive = false;
  nodeList: HpcNode[] = [];
  selectedNode!: HpcNode;
  ascSort = ClrDatagridSortOrder.ASC;
  navArray = [] as any;
  public selectedNodeGroup: string = '';
  public listItems: Array<string> = [
    'Simulation',
    'BladedSimulation',
    'PrePostProcessing',
  ];

  constructor(
    private hpcStateService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.populateList();
    this.populateNavigation();
  }

  populateNavigation() {
    this.hpcStateService.getNavigations().subscribe((res) => {
      this.navArray = res;
    });
  }

  populateList() {
    this.nodesLoading = true;
    this.nodeList = [];
    this.hpcStateService.list().subscribe((nodeList) => {
      this.nodesLoading = false;
      this.nodeList = nodeList;
    });
  }

  nodeListPage() {
    this.router.navigate(['nodelist']);
  }

  homePage() {
    this.router.navigate(['']);
  }

  update(node: HpcNode): void {
    this.stateChangeActive = true;
    this.hpcStateService.state(!node.state, node.name).subscribe((_) => {
      node.state = !node.state;
      this.stateChangeActive = false;
    });
  }

  onNodeGroupChange(event: any) {
    this.selectedNodeGroup = event.target.value;
  }
}
