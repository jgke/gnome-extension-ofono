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

const Gio = imports.gi.Gio;

const BUS_NAME = 'org.ofono';
const MANAGER_PATH = '/';

const _MANAGER_INTERFACE = '<node>\
<interface name="org.ofono.Manager"> \
    <method name="GetModems"> \
        <arg name="modems" type="a(oa{sv})" direction="out"/> \
    </method> \
    <signal name="ModemAdded"> \
        <arg name="path" type="o"/> \
        <arg name="properties" type="a{sv}"/> \
    </signal> \
    <signal name="ModemRemoved"> \
        <arg name="path" type="o"/> \
    </signal> \
</interface></node>';

const _MODEM_INTERFACE = '<node>\
<interface name="org.ofono.Modem"> \
    <method name="SetProperty"> \
        <arg name="name" type="s" direction="in"/> \
        <arg name="value" type="v" direction="in"/> \
    </method> \
    <signal name="PropertyChanged"> \
        <arg name="name" type="s"/> \
        <arg name="value" type="v"/> \
    </signal> \
</interface></node>';

const _SIM_MANAGER_INTERFACE = '<node>\
<interface name="org.ofono.SimManager"> \
    <method name="GetProperties"> \
        <arg name="properties" type="a{sv}" direction="out"/> \
    </method> \
    <method name="SetProperty"> \
        <arg name="name" type="s" direction="in"/> \
        <arg name="value" type="v" direction="in"/> \
    </method> \
    <method name="EnterPin"> \
        <arg name="type" type="s" direction="in"/> \
    <arg name="pin" type="s" direction="in"/> \
    </method> \
    <method name="ResetPin"> \
        <arg name="type" type="s" direction="in"/> \
        <arg name="puk" type="s" direction="in"/> \
        <arg name="newpin" type="s" direction="in"/> \
    </method> \
    <signal name="PropertyChanged"> \
        <arg name="name" type="s"/> \
        <arg name="value" type="v"/> \
    </signal> \
</interface></node>';

const _CONNECTION_MANAGER_INTERFACE = '<node>\
<interface name="org.ofono.ConnectionManager"> \
    <method name="GetProperties"> \
        <arg name="properties" type="a{sv}" direction="out"/> \
    </method> \
    <method name="SetProperty"> \
        <arg name="name" type="s" direction="in"/> \
        <arg name="value" type="v" direction="in"/> \
    </method> \
    <method name="GetContexts"> \
        <arg name="contexts" type="a(oa{sv})" direction="out"/> \
    </method> \
    <method name="AddContext"> \
        <arg name="type" type="s" direction="in"/> \
        <arg name="path" type="o" direction="out"/> \
    </method> \
    <signal name="PropertyChanged"> \
        <arg name="name" type="s"/> \
        <arg name="value" type="v"/> \
    </signal> \
    <signal name="ContextAdded"> \
        <arg name="path" type="o"/> \
        <arg name="properties" type="a{sv}"/> \
    </signal> \
        <signal name="ContextRemoved"> \
        <arg name="path" type="o"/> \
    </signal> \
</interface></node>';

const _CONNECTION_CONTEXT_INTERFACE = '<node>\
<interface name="org.ofono.ConnectionContext"> \
    <method name="GetProperties"> \
        <arg name="properties" type="a{sv}" direction="out"/> \
    </method> \
    <method name="SetProperty"> \
        <arg name="name" type="s" direction="in"/> \
        <arg name="value" type="v" direction="in"/> \
    </method> \
    <signal name="PropertyChanged"> \
        <arg name="name" type="s"/> \
        <arg name="value" type="v"/> \
    </signal> \
</interface></node>';

const ManagerProxyWrapper = Gio.DBusProxy.makeProxyWrapper(_MANAGER_INTERFACE);
const ModemProxyWrapper = Gio.DBusProxy.makeProxyWrapper(_MODEM_INTERFACE);
const SimManagerProxyWrapper = Gio.DBusProxy.makeProxyWrapper(_SIM_MANAGER_INTERFACE);
const ConnectionManagerProxyWrapper = Gio.DBusProxy.makeProxyWrapper(_CONNECTION_MANAGER_INTERFACE);
const ConnectionContextProxyWrapper = Gio.DBusProxy.makeProxyWrapper(_CONNECTION_CONTEXT_INTERFACE);

function ManagerProxy() {
    return new ManagerProxyWrapper(Gio.DBus.system, BUS_NAME, MANAGER_PATH);
}

function ModemProxy(path) {
    return new ModemProxyWrapper(Gio.DBus.system, BUS_NAME, path);
}

function SimManagerProxy(path) {
    return new SimManagerProxyWrapper(Gio.DBus.system, BUS_NAME, path);
}

function ConnectionManagerProxy(path) {
    return new ConnectionManagerProxyWrapper(Gio.DBus.system, BUS_NAME, path);
}

function ConnectionContextProxy(path) {
    return new ConnectionContextProxyWrapper(Gio.DBus.system, BUS_NAME, path);
}
