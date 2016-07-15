(function(H) {

  var timerId = {};

  H.wrap(H.Tooltip.prototype, 'refresh', function(proceed) {

    if (this.shared) {
      proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    } else {

      var seriesName;
      if (Array.isArray(arguments[ 1 ])) {
        // Can be array in case that, it's shared tooltip
        seriesName = "not_have_now_clear_id";
      } else {
        seriesName = arguments[ 1 ].series.name;
      }

      var delayForDisplay = this.chart.options.tooltip.delayForDisplay ? this.chart.options.tooltip.delayForDisplay : 1000;

      if (timerId[ seriesName ]) {
        clearTimeout(timerId[ seriesName ]);
        delete timerId[ seriesName ];
      }

      timerId[ seriesName ] = window.setTimeout(function() {
        var point = this.refreshArguments[ 0 ];

        if (point === this.chart.hoverPoint || $.inArray(this.chart.hoverPoint, point) > -1) {
          proceed.apply(this.tooltip, this.refreshArguments);
        }

      }.bind({
        refreshArguments: Array.prototype.slice.call(arguments, 1),
        chart: this.chart,
        tooltip: this
      }), delayForDisplay);
    }
  });

}(Highcharts));