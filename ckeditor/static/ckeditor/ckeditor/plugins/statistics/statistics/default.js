/*
 Copyright (c) 2014, django-ckeditor - Mohamed ali AFFES. All rights reserved.
*/
CKEDITOR.addStats(
	"default",
	{
		imagesPath: CKEDITOR.getUrl(CKEDITOR.plugins.getPath("statistics")
			+"statistics/images/"),
		statistics:
		[
			{
				title:"Circle chart",
				image:"stat1.png",
				description:"Circle chart with percentage value and simple description.",
				html:'<span id="chart" class="chart" data-percent="10"><span class="percent">&nbsp;</span></span>'

			},
			/*{
				title:"Circle 2",
				image:"stat2.png",
				description:"Circle chart with percentage value, info-text and simple text.",
				html:'<div style="width: 100%"><div style="width: 80%"><p><i><b>Type the text here</b></i> yyyooouuu sdsdfsdfsdfsdfsdfsdfsdfsdf sfdsdfsdf sfsdf</p><hr style="height: 3px;color: blue"></div><div style="width: 20%"><div id="myStat1" data-dimension="100" data-text="75%" data-width="10" data-fontsize="12" data-percent="75" data-fgcolor="#61a9dc" data-bgcolor="#eee" ></div></div>'
			},
			{
				title:"Circle 3",
				image:"stat3.png",
				description:"Circle chart with value info-text and fontawesome icon.",
				html:'<span class="chart" data-percent="86"><span class="percent"></span></span>'
			}*/
		]
	}
	);