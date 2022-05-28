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
       categories:['','core2','core3','core4','core5']
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
        name: 'Max',
        data: [1,2,3,4,5]
    }, {
        name: 'Avg',
        data: [24916, 24064, 29742, 29851, 32490]
    }, {
        name: 'Min',
        data: [11744, 17722, 16005, 19771, 20185]

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
