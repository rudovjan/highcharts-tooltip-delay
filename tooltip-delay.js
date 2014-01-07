(function (H) {

    H.wrap(H.Point.prototype, 'onMouseOver', function (proceed) {

        var point = this,
            series = point.series,
            chart = series.chart,
            tooltip = chart.tooltip;

        point.delayForDisplay = chart.options.tooltip.delayForDisplay || 1000;

        proceed.apply(point, Array.prototype.slice.call(arguments, 1));
    });

    H.wrap(H.Tooltip.prototype, 'refresh', function (proceed) {

        var point = arguments[1];
        var chart = this.chart;
        var tooltip = this;
        var refreshArguments = arguments;

        if(point.delayForDisplay){
            window.setTimeout(function () {
                if (point === chart.hoverPoint) {
                    proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));
                }
            }, point.delayForDisplay || 1000);
        } else {
            proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));
        }

    });

}(Highcharts));
