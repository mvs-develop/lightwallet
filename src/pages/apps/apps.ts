 import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobals } from '../../app/app.global';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
import { Storage } from "@ionic/storage";
//import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { AlertProvider } from '../../providers/alert/alert';

//declare let cordova: any;
@IonicPage()
@Component({
    selector: 'page-apps',
    templateUrl: 'apps.html',
})
export class AppsPage {

    network: string
    loaded: boolean = false
    walletType: string;
    iab: any;
    iab2: any;
    browser: any;
    browser2: any;

    constructor(
        public nav: NavController,
        public translate: TranslateService,
        private globals: AppGlobals,
        public platform: Platform,
        private wallet: WalletServiceProvider,
        private storage: Storage,
        //private alert: AlertProvider,
    ) {
        this.network = this.globals.network
        //this.iab     = new InAppBrowser();
        //this.iab2    = new InAppBrowser();

        // 获取当前显示的钱包是 ETP 还是 DNA
        this.storage.get('walletType').then((walletType) => {
            this.walletType = walletType === 'dna' ? 'dna' : 'etp';
            this.storage.get('walletHasDna').then((walletHasDna) => {
                this.loaded = true;
                if (!walletHasDna) {
                    this.walletType = 'etp';
                }
            });
        });


    }

    ionViewDidEnter() {

    }

    EtpBridgePage = () => this.nav.push("EtpBridgePage")

    PluginSettingsPage = e => this.nav.push("PluginSettingsPage")

    MovieTicketsPage = () => this.wallet.openLink("https://movies.mvsdna.com")

    gotoDnaDapp = (url) => {
        // 'toolbar=no,location=no'

        this.browser = this.iab.create(url, '_blank');//this.iab.create(url, '_blank');
        this.browser.on('message').subscribe((e) => {
            this.nav.push('PluginSettingsPage');
            //this.browser2 = cordova.ThemeableBrowser.open('https://qq.com', '_blank');
        });

        this.browser.on('loadstop').subscribe((e) => {
            //this.alert.showMessage('webview loadstop: ', 'true', '');
            this.browser.executeScript({code: 'try {alert(JSON.stringify(window.webkit.messageHandlers));window.webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({x:1,y:2}));} catch(e) {alert(JSON.stringify(e.message))}'});
        });
    }
}
