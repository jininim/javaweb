

Highcharts.chart('container', {

    title: {
        text: '@의 core별 수행능력'
    },

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
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
    },

    series: [{
        name: 'task1',
        data: [43934, 52503, 57177, 69658, 97031]
    }, {
        name: 'task2',
        data: [24916, 24064, 29742, 29851, 32490]
    }, {
        name: 'task3',
        data: [11744, 17722, 16005, 19771, 20185]
    }, {
        name: 'task4',
        data: [null, null, 7988, 12169, 15112]
    }, {
        name: 'task5',
        data: [12908, 5948, 8105, 11248, 8989]
    }],

    responsive: {
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

});