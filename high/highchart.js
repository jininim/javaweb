Highcharts.setOptions({
    subtitle: {
        text: '팀명: 김이박'
    },
    yAxis: {
        title: {
            text: 'Values'
        }
    },
    xAxis: {
       categories:['core1','core2','core3','core4','core5']
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        }
});
for ( var i = 1; i < 6; i++){ // 받은 데이터 값 배열
Highcharts.chart('container'+[i], {
    title: {
        text: 'task'+[i]+'의 core별 수행능력'
    },
    series: [{
        name: 'Max',
        data: [24916, 24064, 29742, 29851, 32490]
    }, {
        name: 'Avg',
        data: [11744, 17722, 16005, 19771, 20185]
    }, {
        name: 'Min',
        data: [1,2,3,4,5]
    }]
})
};

  /*  responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
*/
