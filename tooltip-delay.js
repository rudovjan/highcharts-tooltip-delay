(function (H) {

    var timerId = {};

    H.wrap(H.Tooltip.prototype, 'refresh', function (proceed) {

        var seriesName = arguments[1].series.name;

        var delayForDisplay = this.chart.options.tooltip.delayForDisplay ? this.chart.options.tooltip.delayForDisplay : 1000;

        if (timerId[seriesName]) {
            clearTimeout(timerId[seriesName]);
            delete timerId[seriesName];
        }

        timerId[seriesName] = window.setTimeout(function () {
            var point = this.refreshArguments[0];

            if (point === this.chart.hoverPoint || $.inArray(this.chart.hoverPoint, point) > -1) {
                proceed.apply(this.tooltip, this.refreshArguments);
            }

        }.bind({
            refreshArguments: Array.prototype.slice.call(arguments, 1),
            chart: this.chart,
            tooltip: this
        }), delayForDisplay);

    });

}(Highcharts));