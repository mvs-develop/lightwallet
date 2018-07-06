import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { PluginProvider, Plugin } from '../../providers/plugin/plugin'
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
    selector: 'page-plugin-settings',
    templateUrl: 'plugin-settings.html',
})
export class PluginSettingsPage {

    plugins: Array<Plugin>

    constructor(
        public navCtrl: NavController,
        private events: Events,
        private alert: AlertProvider,
        private pluginService: PluginProvider
    ) {
    }

    addPlugin(url){
        this.pluginService.fetchPlugin(url)
            .then((plugin: Plugin)=>this.pluginService.addPlugin(plugin))
            .then(()=>this.navCtrl.setRoot('AccountPage'))
            .then(()=>this.events.publish('settings_update'))
            .catch(error=>{
                if(error.message=="ERR_PLUGIN_ALREADY_EXISTS")
                    this.alert.showError('Error',error.message)

            })
    }

    removePlugin = (name) => {
        console.log(name)
        this.pluginService.removePlugin(name)
            .then(()=>this.events.publish('settings_update'))
            .then(()=>this.loadPlugins())
    }

    loadPlugins(){
        return this.pluginService.getPlugins()
            .then(plugins=>{
                this.plugins=plugins
            })
    }

    ionViewDidLoad() {

        this.loadPlugins()

        console.log('ionViewDidLoad PluginSettingsPage');
    }

}