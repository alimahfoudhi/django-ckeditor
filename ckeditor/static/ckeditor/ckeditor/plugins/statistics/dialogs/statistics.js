/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/

(function(){CKEDITOR.dialog.add("statistics",function(c){
	function o(a,b){var k=CKEDITOR.dom.element.createFromHtml('<a href="javascript:void(0)" tabIndex="-1" role="option" ><div class="cke_tpl_item"></div></a>'),d='<table style="width:350px;" class="cke_tpl_preview" role="presentation"><tr>';a.image&&b&&(d+='<td class="cke_tpl_preview_img"><img src="'+CKEDITOR.getUrl(b+a.image)+'"'+(CKEDITOR.env.ie6Compat?' onload="this.width=this.width"':"")+' alt="" title=""></td>');d+='<td style="white-space:normal;"><span class="cke_tpl_title">'+
a.title+"</span><br/>";a.description&&(d+="<span>"+a.description+"</span>");k.getFirst().setHtml(d+"</td></tr></table>");k.on("click",function(){p(a.html)});return k}function p(a){
	
	c.test=function (a) {
		c.insertHtml(a);

		var dialog = CKEDITOR.dialog.getCurrent(),
			data = {},
			span = c.document.getById('chart');
			//span = c.document.createElement(a);
			//span = c.document.createElement( 'span' );
			//innerSpan = c.document.createElement( 'span' );

			dialog.commitContent( data );
			span.setAttribute( 'data-percent', data.percentage );
			
			//span.append(innerSpan);
			//c.insertElement( span );
			dialog.hide();
			
			//span.setHtml( c.statHtml );
//span.setHtml( a);
			//span.setAttribute( 'class', 'chart')
			//innerSpan.setAttribute( 'class', 'percentage')
			
			// Populate the data object with data entered in the dialog window.
			/*dialog.commitContent( data );

			span.setAttribute( 'data-percent',
				data.percentage
				//dialog.getValueOf( 'tab-basic', 'part-value' )
				);*/
			
			
			//var iframe = $('iframe');

			//$('#myStat1', iframe.contents()).circliful();
			//var b = $('.chart', iframe.contents());
			
			var iframe = document.getElementsByClassName('cke_wysiwyg_frame cke_reset')[0];
			var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

			var chart = window.chart = new EasyPieChart(
				innerDoc.querySelector('.chart'), {
				easing: 'easeOutElastic',
				delay: 3000,
				onStep: function(from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent);
				}
			});

			/*document.querySelector('.js_update').addEventListener('click', function(e) {
				chart.update(Math.random()*200-100);
			});*/
	};
	var b=CKEDITOR.dialog.getCurrent();b.getValueOf("selectTpl"/*,"chkInsertOpt"*/)?(c.fire("saveSnapshot"),c.setData(a,function(){b.hide();var a=c.createRange();a.moveToElementEditStart(c.editable());a.select();setTimeout(function(){c.fire("saveSnapshot")},0)})):(/*c.insertHtml(a),*/c.test(a)/*,b.hide()*/)}
function i(a){var b=a.data.getTarget(),
c=g.equals(b);if(c||g.contains(b)){var d=a.data.getKeystroke(),f=g.getElementsByTag("a"),e;if(f){if(c)e=f.getItem(0);else switch(d){case 40:e=b.getNext();break;case 38:e=b.getPrevious();break;case 13:case 32:b.fire("click")}e&&(e.focus(),a.data.preventDefault())}}}
var h=CKEDITOR.plugins.get("statistics");

CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path+"dialogs/statistics.css"));
/*CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path+"lib/jquery-plugin-circliful/css/jquery.circliful.css"));
CKEDITOR.scriptLoader.load( CKEDITOR.getUrl(h.path+"lib/jquery-1.10.2.min.js"));
CKEDITOR.scriptLoader.load( CKEDITOR.getUrl(h.path+"lib/jquery-plugin-circliful/js/jquery.circliful.min.js"));
*/

CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path+"lib/easypiechart.css"));
CKEDITOR.scriptLoader.load( CKEDITOR.getUrl(h.path+"lib/easypiechart.min.js"));

var g,h="cke_tpl_list_label_"+CKEDITOR.tools.getNextNumber(),f=c.lang.statistics,l=c.config;return{title:c.lang.statistics.title,
minWidth:CKEDITOR.env.ie?440:400,minHeight:340,
contents:[
	{
		id:"selectTpl",
		label:f.title,
		elements:[
			{
				type:"vbox",
				/*padding:2,*/
				children:[
					{
						type: 'text',
						id: 'percentage',
						label: 'Percentage',
						required : true,
						validate: CKEDITOR.dialog.validate.number( "Invalid number." ),
						commit : function( data )
						{
							data.percentage = this.getValue();
						}
					},
					{
						type : 'text',
						id : 'description',
						label : 'Description',
					//  validate : CKEDITOR.dialog.validate.notEmpty( 'The Description field cannot be empty.' ),
						// Function to be run when the commitContent method of the parent dialog window is called.
						commit : function( data )
						{
							data.description = this.getValue();
						}
					},
					{
						type:"html",
						html:"<div style='height=10px'></div>",
					},
					{
						id:"selectTplText",
						type:"html",
						html:"<span>"+f.selectPromptMsg+"</span>"
					},
					{
						id:"statisticsList",
						type:"html",
						focus:!0,
						html:'<div class="cke_tpl_list" tabIndex="-1" role="listbox" aria-labelledby="'+h+'"><div class="cke_tpl_loading"><span></span></div></div><span class="cke_voice_label" id="'+h+'">'+f.options+"</span>"
					},
					/*{
						id:"chkInsertOpt",
						type:"checkbox",
						label:f.insertOption,
						"default":false
						//l.statistics_replaceContent
					},*/
					 
 


]}]}],buttons:[CKEDITOR.dialog.cancelButton,CKEDITOR.dialog.okButton],
onShow:function(){var a=this.getContentElement("selectTpl","statisticsList");g=a.getElement();CKEDITOR.loadStats(l.statistics_files,function(){var b=(l.statistics||"default").split(",");if(b.length){var c=g;c.setHtml("");for(var d=0,h=b.length;d<h;d++)for(var e=CKEDITOR.getStats(b[d]),i=e.imagesPath,e=e.statistics,n=e.length,j=0;j<n;j++){var m=o(e[j],i);m.setAttribute("aria-posinset",j+1);m.setAttribute("aria-setsize",
n);c.append(m)}a.focus()}else g.setHtml('<div class="cke_tpl_empty"><span>'+f.emptyListMsg+"</span></div>")});this._.element.on("keydown",i)},
onHide:function(){this._.element.removeListener("keydown",i)},
onOk: function() {
				// Create a div element and an object that will store the data entered in the dialog window.
				//var dialog = CKEDITOR.dialog.getCurrent(),
				var dialog = this,
					data = {},
					//statistics = c.document.getById('myStat1');
					statistics = c.document.createElement(c.stat);
					//chart = editor.document.createElement( 'div' );
				
				// Populate the data object with data entered in the dialog window.
				dialog.commitContent( data );


				// Set the div element attributes.	
				statistics.setAttribute( 'data-text',
					data.percentage+'%'
					//dialog.getValueOf( 'tab-basic', 'part-value' )+'%'
					);
				statistics.setAttribute( 'data-percent',
					data.percentage
					//dialog.getValueOf( 'tab-basic', 'part-value' )
					);
				
				c.insertElement( statistics );

				//var iframe = $('iframe'); $('#myStat1', iframe.contents()).circliful();

				var chart = window.chart = new EasyPieChart(document.querySelector('span'), {
					easing: 'easeOutElastic',
					delay: 3000,
					onStep: function(from, to, percent) {
						this.el.children[0].innerHTML = Math.round(percent);
					}
				});

				document.querySelector('.js_update').addEventListener('click', function(e) {
					chart.update(Math.random()*200-100);
				});
			}
}})})();