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
				title:"Circle 1",
				image:"stat1.png",
				description:"Circle chart with percentage value and simple description.",
				html:'<div id="myStat1" data-dimension="100" data-text="75%" data-width="10" data-fontsize="12" data-percent="75" data-fgcolor="#61a9dc" data-bgcolor="#eee" ><div>Text</div>'
			},
			{
				title:"Circle 2",
				image:"stat2.png",
				description:"Circle chart with percentage value, info-text and simple text.",
				html:'<div style="width: 100%"><div style="width: 80%"><p><i><b>Type the text here</b></i> yyyooouuu sdsdfsdfsdfsdfsdfsdfsdfsdf sfdsdfsdf sfsdf</p><hr style="height: 3px;color: blue"></div><div style="width: 20%"><div id="myStat1" data-dimension="100" data-text="75%" data-width="10" data-fontsize="12" data-percent="75" data-fgcolor="#61a9dc" data-bgcolor="#eee" ></div></div>'
			},
			{
				title:"Circle 3",
				image:"stat3.png",
				description:"Circle chart with value info-text and fontawesome icon.",
				html:'<div id="myStat4" data-dimension="100" data-text="72" data-info="New Users" data-width="10" data-fontsize="12" data-percent="46" data-fgcolor="#61a9dc" data-bgcolor="#eee" data-total="150" data-part="72" data-border="inline" data-icon="users" data-icon-size="28" data-icon-color="#ccc"></div>'
			}
		]
	}
	);