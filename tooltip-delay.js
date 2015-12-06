(function (H) {

    var timerId;

    H.wrap(H.Tooltip.prototype, 'refresh', function (proceed) {


        var point = arguments[1];
        var chart = this.chart;
        var tooltip = this;
        var refreshArguments = arguments;
        var delayForDisplay = chart.options.tooltip.delayForDisplay ? chart.options.tooltip.delayForDisplay : 1000;

        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = window.setTimeout(function () {

            if (point === chart.hoverPoint || $.inArray(chart.hoverPoint, point) > -1) {
                proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));
            }

        }, delayForDisplay);
 
    });

}(Highcharts));
