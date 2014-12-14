(function(){
	"use strict";

	var root = this,
		Chart = root.Chart,
		helpers = Chart.helpers;

	var defaultConfig = {

		showTooltips: false,
		segmentShowStroke : true,
		segmentStrokeColor : "#fff",
		segmentStrokeWidth : 2,
		percentageInnerCutout : 50,
		animation : true,
		animationSteps : 100,
		animationEasing : "easeOutBounce",
		animateRotate : true,
		animateScale : false,
		onAnimationComplete : null,
		labelFontFamily : "Arial",
		labelFontStyle : "normal",
		labelFontSize : 24,
		labelFontColor : "#666",
		legendTemplate : '<div class="chartjs-legend"><i><b><%=description%></b></i></div>',
	};

	Chart.types.Doughnut.extend({
		name: "Percentage",
		description: "",
		defaults : defaultConfig,
		initialize:  function(data){
				
			Chart.types.Doughnut.prototype.initialize.apply(this, arguments);
		},
		draw : function(easeDecimal){
			this.chart.ctx.font = this.options.labelFontStyle + " " + this.options.labelFontSize+"px " + this.options.labelFontFamily;

			var animDecimal = (easeDecimal) ? easeDecimal : 1;
			this.clear();

			if(this.segments.length==1){

				var percentage = this.segments[0];
				var	remaining = {
					value : 100 - percentage.value,
					color: "#E8E8E8",
					highlight: "#A8B3C5",
				};
				this.addData(remaining);
					
			}

			helpers.each(this.segments,function(segment,index){
				
				segment.transition({
					circumference : this.calculateCircumference(segment.value),
					outerRadius : this.outerRadius,
					innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
				},animDecimal);

				segment.endAngle = segment.startAngle + segment.circumference;

				segment.draw();

				if (index === 0){
					segment.startAngle = Math.PI * 1.5;
					this.chart.ctx.fillStyle = 'black';
					this.chart.ctx.fillText(Math.round((segment.circumference/(2*Math.PI)*100))+ "%", this.chart.width/2 - 20, this.chart.height/2 ,40);
				}
				//Check to see if it's the last segment, if not get the next and update the start angle
				if (index < this.segments.length-1){
					this.segments[index+1].startAngle = segment.endAngle;
				}
			},this);
			
		}
	});


}).call(this);


