/**
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 */

'use strict';

// TODO i11n
// TODO make height and chart options configurable
// TODO IE8 fallback to a table maybe?
// TODO a11y http://www.w3.org/html/wg/wiki/Correct_Hidden_Attribute_Section_v4
( function() {
// Register the plugin with the editor.
// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.plugins.html
    CKEDITOR.plugins.add( 'cellborder',
    {
        requires: 'menubutton',
        icons: 'border_bottom,border_double_bottom,border_left,border_outer,border_right,border_top,border_none',
        // The plugin initialization logic goes inside this method.
        // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
        init: function( editor ) {
            var borderouter = ( editor.config.borderTypeList || [ 'border_bottom:border bottom:border-bottom:1px solid black',
                    'border_top:border top:border-top:1px solid black',
                    'border_right:border right:border-right:1px solid black',
                    'border_left:border left:border-left:1px solid black',
                    'border_double_bottom:border double bottom:border-bottom:3px double black'] ),
                plugin = this,
                items = {},
                parts,
                curBorderType,
                i;

            // Registers command.
            editor.addCommand( 'border', {
                allowedContent : 'table tr th td[style]{*} caption;',
                contextSensitive: true,
                exec: function( editor, item) {
                    if ( item )
                        editor[ item.style.checkActive( editor.elementPath() ) ? 'removeStyle' : 'applyStyle' ]( item.style );
                },

                remove: function(editor){
                    editor.removeStyle();
                },

                refresh: function( editor, path ) {
                    if(path.contains('table')){
                        var curStyle = plugin.getCurrentBorderType( editor );
                        if ( curStyle ){
                            var att = curStyle.getAttribute( 'style' );
                            if(att){
                                var parts = att.split( ':' );
                                this.setState( parts[0].indexOf('border') == 0 ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
                            }
                            else
                                this.setState(CKEDITOR.TRISTATE_OFF );
                        }
                        else
                            this.setState(CKEDITOR.TRISTATE_OFF );
                    }
                    else
                        this.setState(CKEDITOR.TRISTATE_DISABLED);
                }
            } );

            // Parse borderConfigStrings, and create items entry for each border.
            for ( i = 0; i < borderouter.length; i++ ) {
                parts = borderouter[ i ].split( ':' );
                curBorderType = parts[ 2 ];
                items[ parts[ 0 ] ] = {
                    label: parts[ 1 ],
                    borderType: curBorderType,
                    itemName : parts[0],
                    group: 'border_outer',
                    icon: parts[ 0 ],
                    order: i,
                    onClick: function() {
                        editor.execCommand( 'border', this);
                    },
                    role: 'menuitemcheckbox'
                };

                // Init style property.
                items[ parts[ 0 ] ].style = new CKEDITOR.style( {
                    element: 'td',
                    attributes: {
                        style:  curBorderType + ":" + parts[3]
                    }
                } );
            }

            items.border_none = {
                label: 'Border none',
                group: 'border_general',
                icon: 'border_none',
                order: items.length,
                onClick: function() {
                    var curBorderType = plugin.getCurrentBorderType(editor);

                    if ( curBorderType ){
                        var att = curBorderType.getAttribute( 'style' );
                        if(att){
                            parts = att.split( ':' );
                            this.style = new CKEDITOR.style( {
                                element: 'td',
                                attributes: {
                                    style:  att,
                                }
                            });
                            if ( curBorderType )
                                editor.execCommand( 'border', this);
                        }
                    }
                }
            };


            items.border= {
                label: 'border outer',
                group: 'border_general',
                icon: 'border_outer',
                borderType: 'border',
                order: items.length,
                onClick: function() {
                    editor.execCommand( 'border', this );
                }
            };

            items.border.style = new CKEDITOR.style( {
                element: 'td',
                attributes: {
                    style:  'border: 1px solid black',
                }
            } );

            // Initialize groups for menu.
            editor.addMenuGroup( 'border_outer', 1 );
            editor.addMenuGroup( 'border_general', 2);
            editor.addMenuItems( items );

            editor.ui.add( 'Border',  CKEDITOR.UI_MENUBUTTON, {
                label: 'Rahmenlinie hinzufügen',
                icon: "border_bottom",
                toolbar: 'insert',
                command: 'border',
                allowedContent : 'table tr th td[style]{*} caption;',
                onMenu: function() {
                    var activeItems = {}, parts;
                    curBorderType = plugin.getCurrentBorderType(editor);
                    for ( var prop in items )
                        activeItems[ prop ] = CKEDITOR.TRISTATE_OFF;
                    if ( curBorderType ){
                        var att =   curBorderType.getAttribute( 'style' );
                        if(att){
                            parts = att.split( ':' );
                            var borderType = parts[0];
                            activeItems[ borderType ] = CKEDITOR.TRISTATE_ON;
                        }
                    }
                    return activeItems;
                }
            } );
        },

        // Gets the bordertype for the current editor selection.
        // @param {CKEDITOR.editor} editor
        // @returns {CKEDITOR.dom.element} The bordertype element, if any.
        getCurrentBorderType: function( editor ) {
            var elementPath = editor.elementPath(),
                activePath = elementPath && elementPath.elements,
                pathMember, ret;
            // IE8: upon initialization if there is no path elementPath() returns null.
            if ( elementPath ) {
                for ( var i = 0; i < activePath.length; i++ ) {
                    pathMember = activePath[ i ];
                    if ( !ret && pathMember.getName() == 'td' && pathMember.hasAttribute( 'style' )){
                        ret = pathMember;
                    }
                }
            }
            return ret;
        }
    } );
} )();
/*! End - Added by Mohamed Ali AFFES */