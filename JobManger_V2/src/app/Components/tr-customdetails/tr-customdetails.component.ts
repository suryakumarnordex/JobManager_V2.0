import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsService } from 'src/app/Services/highcharts.service';
@Component({
  selector: 'app-tr-customdetails',
  templateUrl: './tr-customdetails.component.html',
  styleUrls: ['./tr-customdetails.component.css']
})
export class TrCustomdetailsComponent implements OnInit {
  @ViewChild('charts') public chartEl: ElementRef;
  charts = [];
  public defaultOptions:any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie'
    },
    title: {
        text: 'Numbers of Jobs by Status'
    },
    tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme) || 'black'
                }
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Job Status',
        colorByPoint: true,
        data: [{
            name: 'Running',
            y:10
        }, {
            name: 'Finished',
            y: 15
        }, {
            name: 'Failed',
            y: 8
        }, {
            name: 'Queued',
            y: 60
        }
        // , {
        //     name: 'Safari',
        //     y: 4.18
        // }, {
        //     name: 'Other',
        //     y: 2.61
        // }
    ]
    }]
}

  constructor() { }
  ngOnInit() {
    //this.createChart();
  }
  createCharted(container:any, options?: Object) {
    var opts = this.defaultOptions;
    console.log(opts)
    let e = document.createElement("div");
    
    container.appendChild(e);
    
    if(opts.chart) {
     //opts.chart['renderTo'] = e;
    }
     Highcharts.chart(container, opts);
  }
  createChart() {
      this.createCharted(this.chartEl.nativeElement);
  }
}
