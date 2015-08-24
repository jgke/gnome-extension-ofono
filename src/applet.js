/*
 * Copyright (C) 2015 Intel Corporation. All rights reserved.
 * Author: Jaakko Hannikainen <jaakko.hannikainen@intel.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const Lang = imports.lang;

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const ExtensionUtils = imports.misc.extensionUtils;
const Ext = ExtensionUtils.getCurrentExtension();
const Interface = Ext.imports.interface;
const Logger = Ext.imports.logger;

const Applet = new Lang.Class({
    Name: 'Applet',
    Extends: PanelMenu.SystemIndicator,

    _init: function() {
        this.parent();

        this._watch = Gio.DBus.system.watch_name(Interface.BUS_NAME,
                Gio.BusNameWatcherFlags.NONE,
                this._connectEvent.bind(this),
                this._disconnectEvent.bind(this));
    },

    _connectEvent: function() {
        Logger.logInfo('Connected to oFono');

        this._manager = new Interface.ManagerProxy();

        this._asig = this._manager.connectSignal('ModemAdded',
            function(proxy, sender, [path, properties]) {
                try {
                    log('Modem added');
                } catch(error) {
                    Logger.logException(error);
                }
            }.bind(this));
        this._rsig = this._manager.connectSignal('ModemRemoved',
            function(proxy, sender, [path, properties]) {
                log('Modem removed');
            }.bind(this));
    },

    _disconnectEvent: function() {
        Logger.logInfo('Disconnected from oFono');
        let signals = [this._asig, this._rsig];
        if(this._manager) {
            Logger.logDebug('Disconnecting signals');
            for(let signalId in signals) {
                try {
                    Logger.logDebug('Disconnecting signal ' + signals[signalId]);
                    this._manager.disconnectSignal(signals[signalId]);
                } catch(error) {
                    Logger.logException(error, 'Failed to disconnect signal');
                }
            }
        }
        this._manager = null;
    },

    destroy: function() {
        Logger.logInfo('Disabling oFono applet');
        this._disconnectEvent();
        if(this._watch)
            Gio.DBus.system.unwatch_name(this._watch);
        this._watch = null;
    },
});
