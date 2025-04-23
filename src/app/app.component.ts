import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';
import { SwUpdateService } from 'src/service/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  constructor(
    private swUpdateService: SwUpdateService,
    private coinsService: CoinsGenericService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title
  ) {
    this.registerIcons();
  }
  ngOnInit(): void {
    this.swUpdateService.init();

    this.subscription.add(
      this.coinsService.loadCoins().subscribe((coins) => {
        this.coinsService.setCoins(coins);
      })
    );
    this.updateMetaTags();
  }

  registerIcons(): void {
    const icons: { name: string; url: string }[] = [
      { name: 'mobile-loupe', url: 'assets/icons/mobile-loupe.svg' },
      { name: 'bingx-sf', url: 'assets/icons/bingx-sf.svg' },
      { name: 'google-icon', url: 'assets/icons/google-icon.svg' },
      { name: 'bingx-pf', url: 'assets/icons/bingx-pf.svg' },
      { name: 'sorter', url: 'assets/icons/sorter.svg' },
      { name: 'play', url: 'assets/icons/play.svg' },
      { name: 'pause', url: 'assets/icons/pause.svg' },
      { name: 'ws', url: 'assets/icons/ws.svg' },
      { name: 'websocket', url: 'assets/icons/websocket.svg' },
      { name: 'check', url: 'assets/icons/check.svg' },
      { name: 'close', url: 'assets/icons/close.svg' },
      { name: 'sort-up', url: 'assets/icons/sort-up.svg' },
      { name: 'sort-down', url: 'assets/icons/sort-down.svg' },
      { name: 'alarm', url: 'assets/icons/alarm.svg' },
      { name: 'tv-negative', url: 'assets/icons/tv-negative.svg' },
      { name: 'triggered-alarm', url: 'assets/icons/triggered-alarm.svg' },
      { name: 'tv-white', url: 'assets/icons/tv-white.svg' },
      { name: 'bybit', url: 'assets/icons/bybit.svg' },
      { name: 'tv', url: 'assets/icons/tv.svg' },
      { name: 'binance', url: 'assets/icons/binance-black.svg' },
      { name: 'mintmark', url: 'assets/icons/mintmark.svg' },
      { name: 'admin', url: 'assets/icons/admin.svg' },
      { name: 'send-to', url: 'assets/icons/send-to.svg' },
      { name: 'black-list', url: 'assets/icons/black-list.svg' },
      { name: 'send-from', url: 'assets/icons/send-from.svg' },
      { name: 'coin-sorter', url: 'assets/icons/coin-sorter.svg' },
      { name: 'coinglass', url: 'assets/icons/coinglass.svg' },
      { name: 'edit', url: 'assets/icons/edit.svg' },
      { name: 'long-list', url: 'assets/icons/long-list.svg' },
      { name: 'delete', url: 'assets/icons/delete.svg' },
      { name: 'delete-gray', url: 'assets/icons/delete-gray.svg' },
      { name: 'magic', url: 'assets/icons/magic.svg' },
      { name: 'bitcoin', url: 'assets/icons/bitcoin.svg' },
      { name: 'info', url: 'assets/icons/info.svg' },
      { name: 'flare', url: 'assets/icons/flare.svg' },
      { name: '_arrow_forward', url: 'assets/icons/arrow-forward.svg' },
      { name: 'reset_focus', url: 'assets/icons/reset_focus.svg' },
      { name: '_arrow_back', url: 'assets/icons/arrow-back.svg' },
      { name: 'twitter', url: 'assets/icons/twitter.svg' },
      { name: 'cloud_sync', url: 'assets/icons/cloud_sync.svg' },
      { name: 'reddit', url: 'assets/icons/reddit.svg' },
      { name: 'telegram', url: 'assets/icons/telegram.svg' },
      { name: 'github', url: 'assets/icons/github.svg' },
      { name: 'facebook', url: 'assets/icons/facebook.svg' },
      { name: 'cmc', url: 'assets/icons/cmp.svg' },
      { name: 'add', url: 'assets/icons/add.svg' },
      // Add more icons here
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }

  updateMetaTags() {
    console.log('Updating meta tags...');
    const baseUrl = window.location.origin; // e.g., 'https://yourwebsite.com'
    const imageUrl = `${baseUrl}/assets/img/lizard.png`; // Absolute URL for the image
    console.log(`Image Url --> ${imageUrl}`);
    // Set the page title
    this.title.setTitle('PriceLevels Screener');

    // Update Open Graph meta tags (used by Telegram, VK, and others)
    this.meta.updateTag({
      property: 'og:title',
      content: 'Price Levels Screener - Analyze Market Trends',
    });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Monitoring Price Movements worldwide',
    });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://levels-screener-mobile.web.app/',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // VK-Specific Meta Tags
    this.meta.updateTag({
      property: 'vk:image',
      content: imageUrl,
    });
    this.meta.updateTag({
      property: 'vk:title',
      content: 'Price Levels Screener - Analyze Market Trends',
    });
    this.meta.updateTag({
      property: 'vk:description',
      content: 'Monitoring Price Movements worldwide',
    });

    // Twitter Card Meta Tags (optional but good for broader compatibility)
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Price Levels Screener - Analyze Market Trends',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Monitoring Price Movements worldwide',
    });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    // Standard Meta Tags
    this.meta.updateTag({
      name: 'description',
      content: 'Monitoring Price Movements worldwide',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
