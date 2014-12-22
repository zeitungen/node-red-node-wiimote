/**
 * Copyright 2014 Maxime 'zeitungen' Journaux.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function ( RED ) {
    var wii = require ( "node-wii" );
    var WiiMote = wii.WiiMote;

    var wiimote = null;
    var RECONNECT_TIME = 3 * 1000;
    var nodes = [ ];

    connectWiimote ( );

    function WiimoteNodeIn ( n ) {
        RED.nodes.createNode ( this, n );
    
        nodes.push ( this );

        this.on ( "close", function ( ) {
            this.log ( "close" )
            nodes = [ ];
        }.bind ( this ) );
    }
    RED.nodes.registerType ( "wiimote in", WiimoteNodeIn );

    function sendMsg ( msg ) {
        for ( var i in nodes )
            nodes[i].send ( msg );
    }

    function connectWiimote ( ) {
        wiimote = new WiiMote ( );
        console.log ( "[wiimote] try to etablish connection" );
        wiimote.connect ( "00:00:00:00:00:00", function ( err ) {
            if ( err ) {
                console.log ( "[wiimote] no etablish connection" );
                setTimeout(connectWiimote, RECONNECT_TIME);
                return;
            }
            console.log ( "[wiimote] etablish connection" );

            wiimote.led ( 1, true );
            wiimote.led ( 3, true );
            wiimote.button ( true );
            // wiimote.acc ( true );

            wiimote.on ( "button", function ( btn ) {
                var code = "";
                switch ( btn ) {
                    case wii.BTN_1:     code = "1"; break;
                    case wii.BTN_2:     code = "2"; break;
                    case wii.BTN_A:     code = "A"; break;
                    case wii.BTN_B:     code = "B"; break;
                    case wii.BTN_MINUS: code = "-"; break;
                    case wii.BTN_PLUS:  code = "+"; break;
                    case wii.BTN_HOME:  code = "HOME"; break;
                    case wii.BTN_LEFT:  code = "LEFT"; break;
                    case wii.BTN_RIGHT: code = "RIGHT"; break;
                    case wii.BTN_UP:    code = "UP"; break;
                    case wii.BTN_DOWN:  code = "DOWN"; break;
                }
                if ( btn == wii.BTN_MINUS + wii.BTN_PLUS ) {
                    wiimote.disconnect ( );
                    wiimote.emit ( "disconnect" );
                }
                sendMsg ( { topic: "button", payload: code } );
            } );

            wiimote.on ( "acc", function ( pos ) {
            } );

            wiimote.on ( "disconnect", function ( ) {
                setTimeout(connectWiimote, RECONNECT_TIME);
            } );
        } )
    }
    
}
