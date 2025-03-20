
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/polyfills-legacy.CY0vZ83u.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/app-legacy.CLZOVlzJ.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/page-Information-legacy.B0ky34vV.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/ButtonWithRegisterWebPixel-legacy.D6B2t9rJ.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/NoAddressLocationFullDetour-legacy.DZgqhIjJ.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/DeliveryMethodSelectorSection-legacy.UqP8ig6F.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/useEditorShopPayNavigation-legacy.I2XSHyjM.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/VaultedPayment-legacy.mPHcpwRL.js"];
      var styles = [];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/roboto/roboto_n4.da808834c2315f31dd3910e2ae6b1a895d7f73f5.woff2?h1=amJoaWZpLmNvbS5hdQ&hmac=136ef29d0615c6cf24bd21eef971b99b25e45a886552491d44493c94c8798e72","https://fonts.shopifycdn.com/roboto/roboto_n7.51ede27d5b58491d9cf07ad184108da52fef80b4.woff2?h1=amJoaWZpLmNvbS5hdQ&hmac=33730561d2fbf820365890bfa8baa99306ddf391277abeeb9a64bdb7dd2eddc0"];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0024/9803/5810/files/JB_logo_full_x320.png?v=1722349008","https://cdn.shopify.com/s/files/1/0024/9803/5810/files/yellowBG_2000x.png?v=1722349034"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  