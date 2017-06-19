/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer/app-drawer.html","de140441ae43953445e7bd489ca6b172"],["bower_components/app-layout/app-header/app-header.html","3ec969edc171dd48c585ca49fc6fe9b9"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","817ec152e21c5a302eab47e94d35ffa7"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","48314bbaa9f07c810b0f527a567e56c3"],["bower_components/app-layout/app-toolbar/app-toolbar.html","ef9e0634d2c117921d15ca1c9f2721cb"],["bower_components/app-layout/helpers/helpers.html","a2ace262736b8ac4b75f93d7f77e01e2"],["bower_components/app-route/app-location.html","9e4646459b694e905443c3966b78b484"],["bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["bower_components/app-route/app-route.html","84473fb46273ce5d4c99307a43c31180"],["bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-client.html","2d172ba045e7d9b9fe27308cb2bf7417"],["bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html","d718c28c4590226b6ce37cd5b95b137f"],["bower_components/app-storage/app-indexeddb-mirror/common-worker.html","56f2da3803ba7b71b83c2e23c905d3d2"],["bower_components/app-storage/app-network-status-behavior.html","1ff0a15f9c7178f68e56022990bf77ef"],["bower_components/app-storage/app-storage-behavior.html","10d363d7a148228f36feec65617fcc17"],["bower_components/file-upload/file-upload-icons.html","f7ad7d8b9f7c76f0617a1fe54a663b4a"],["bower_components/firebase/firebase-app.js","d377fc5c04f708acbcbf9497efc4cef2"],["bower_components/firebase/firebase-auth.js","411bc99de93fbafe668a21ef8df92062"],["bower_components/firebase/firebase-database.js","3a1800ea377e98f027a5ca50fdad982e"],["bower_components/firebase/firebase-messaging.js","dea374716036b543a01652cd991302c6"],["bower_components/firebase/firebase-storage.js","234fcbc81c2577a7cc9a14696ec69f67"],["bower_components/font-roboto/roboto.html","4fa582f0702a651ddea0643b823749e7"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1383598a761bfc4837d6ecdaf9b5b590"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","ea8c16db6ad00719df05f0330a73c2e1"],["bower_components/iron-ajax/iron-ajax.html","1506d233dab7caba7584d3f4cee40a9f"],["bower_components/iron-ajax/iron-request.html","0b5272c343f81c8a50c946aab6a46dfa"],["bower_components/iron-behaviors/iron-button-state.html","ad11d27d50d38264a3bef6a6e076d0b5"],["bower_components/iron-behaviors/iron-control-state.html","1f5cde65fe782de4916df63da7162e13"],["bower_components/iron-demo-helpers/demo-pages-shared-styles.html","1748ee03e3b0c0d5f7c443cf2aefc1cb"],["bower_components/iron-demo-helpers/demo-snippet.html","e543ea3715696fcede8417e979308b5c"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","67332ab1349382bc437f01a3892ba01f"],["bower_components/iron-flex-layout/iron-flex-layout.html","e51ac42c0d818d266ab6cdffcca0f0f2"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","1c35587fb52660b045acf0f43a2a2cdc"],["bower_components/iron-form/iron-form.html","64dd54f48b39b430ba30bce68d7db8ae"],["bower_components/iron-icon/iron-icon.html","925e2112741458c1a01f934755402e98"],["bower_components/iron-icons/iron-icons.html","69436d2c0cee445d8cadeeae706b23e8"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","ab98d55446dbf3ebeae7e186a5bf83ba"],["bower_components/iron-input/iron-input.html","dfc055a71f827da7eb881343873fbb8f"],["bower_components/iron-list/iron-list.html","cb4d73ad86e980213fb03ce641d9d35c"],["bower_components/iron-location/iron-location.html","c0ff254235025d994b3b92f358bcbb81"],["bower_components/iron-location/iron-query-params.html","c7f086c89ebd2bcc0d002835bf6f303a"],["bower_components/iron-media-query/iron-media-query.html","88cfc1b313005fef15dbd38bb221021a"],["bower_components/iron-meta/iron-meta.html","e199cb0f092749b13ad53bda7d116fb5"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","8b68649f4b216b89cd792625e6bb0bd8"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","6ff22c7faf26e43baee5061af7d3d36d"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","7a75027fa37ee95378098866946d7611"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","b1b285482ad970867f246ce0cbbe1720"],["bower_components/iron-pages/iron-pages.html","771610cc84fcb5698440d92b2a28efc4"],["bower_components/iron-range-behavior/iron-range-behavior.html","4cda9464f016068df9a05f6d684641b1"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","077af1f350c34964181d7e63379ecd7d"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","418db58bbcb3000c87e4261b65070103"],["bower_components/iron-selector/iron-multi-selectable.html","85a3070610c02e741d84f710ee64410e"],["bower_components/iron-selector/iron-selectable.html","65edc2fc8f7c28cc178276bcc5826068"],["bower_components/iron-selector/iron-selection.html","2e720937ccca46521e76c27199fd83f8"],["bower_components/iron-selector/iron-selector.html","2520e2a3fbc84b166a0d88a1abeb9fd1"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","989b714e8a3be91cc394341260a45060"],["bower_components/marked-element/marked-element.html","c7721c640774bdeb3b4b86ab2b9bc6c1"],["bower_components/marked-element/marked-import.html","29737e5b52c7e8f16cd1de76869fa688"],["bower_components/marked/lib/marked.js","b61b754d249755b3a828d35952342334"],["bower_components/neon-animation/animations/scale-down-animation.html","7d945b7ff4c6aa997305332d0346d4a0"],["bower_components/neon-animation/animations/scale-up-animation.html","95356b786275b8b34ddf0e65daba8152"],["bower_components/neon-animation/neon-animatable-behavior.html","e649f4efc99f7f1d1f5f7e1368b72397"],["bower_components/neon-animation/neon-animation-behavior.html","c17a073e991b45d08482645bb00f69a5"],["bower_components/neon-animation/neon-animation-runner-behavior.html","1e836948dbcee3131798fe28683294f5"],["bower_components/neon-animation/web-animations.html","aa5266664b17a9a7d7ebf0c4e6fcf8c9"],["bower_components/paper-behaviors/paper-button-behavior.html","09686b35929ef386cc50c0a8780bdf6b"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","7bcabd47cfbbcd774f8c00ad5a589143"],["bower_components/paper-behaviors/paper-ripple-behavior.html","622448da37bbb2e7cc43eaccc9ac67d0"],["bower_components/paper-button/paper-button.html","64043146863a29fcbcf3719a624bedab"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","7525fcfaf4d3cd19a9ea6924e2834f17"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","015713d9a702f63bfbfe06396f076e79"],["bower_components/paper-dialog/paper-dialog.html","a86affda6d5decbe10682676984eb981"],["bower_components/paper-fab/paper-fab.html","b2e1a5d09579dda147cef7505ba27613"],["bower_components/paper-icon-button/paper-icon-button.html","ccef1cdd5b8c2d9d357726e7b628209b"],["bower_components/paper-input/paper-input-addon-behavior.html","853b590400ace448f107e0fabdeb75c0"],["bower_components/paper-input/paper-input-behavior.html","0009745f2ccb3da2ed96f32e72afdfa1"],["bower_components/paper-input/paper-input-char-counter.html","d8cd5e14c28b1dad1bfb4607ee3a93ab"],["bower_components/paper-input/paper-input-container.html","e45f94a0548e7c7e01d56cf087ac9889"],["bower_components/paper-input/paper-input-error.html","f417c0a75ebd1c062a813298446165b7"],["bower_components/paper-input/paper-input.html","d0de8d3055aae6a8f03036bcfeec98ab"],["bower_components/paper-item/paper-icon-item.html","aa0cca5b03cb68350645e4c1d8fc691b"],["bower_components/paper-item/paper-item-behavior.html","79794a04fa648d683f7eaf3a72085a35"],["bower_components/paper-item/paper-item-body.html","06125425412922fd1c43d6a0828e2e11"],["bower_components/paper-item/paper-item-shared-styles.html","be0d8b62877d55e0493a8a1bf30a3e19"],["bower_components/paper-material/paper-material-shared-styles.html","1becfee98ff1b125c2919ecee6cd08b2"],["bower_components/paper-progress/paper-progress.html","cca4757e56da95dae904e9039333ca80"],["bower_components/paper-ripple/paper-ripple.html","727c02112759e855c016ff3c4ff264b3"],["bower_components/paper-spinner/paper-spinner-behavior.html","90601f6c814808b3589062c3ffde2208"],["bower_components/paper-spinner/paper-spinner-lite.html","94730da75a11ca5bc28954812595ed1a"],["bower_components/paper-spinner/paper-spinner-styles.html","fe62a242d74b6e0a7ced52ad7bf9bd1a"],["bower_components/paper-styles/color.html","5c2df70242900e37b926efc0eed1cc85"],["bower_components/paper-styles/default-theme.html","e47e7063b5ef72d5f70e389bfb384f40"],["bower_components/paper-styles/shadow.html","84fbdb87d548d4b649b64fbf1e5222d6"],["bower_components/paper-styles/typography.html","8e73541f9a87b5312289b085958de46e"],["bower_components/polymer/polymer-micro.html","29088a527d9919c750e2d01cb29cd908"],["bower_components/polymer/polymer-mini.html","686ec4a386aa98233e361edadb509f8e"],["bower_components/polymer/polymer.html","c75e57e892f43762afdbd61a94f766c9"],["bower_components/polymerfire/firebase-app-script.html","df1897d11acb9c75522859d372873358"],["bower_components/polymerfire/firebase-app.html","ea40cdd9db745783d78b558ff22d3639"],["bower_components/polymerfire/firebase-auth-script.html","12fe480c116018252246dd4366d1a1ef"],["bower_components/polymerfire/firebase-auth.html","a46c3ab0be00d80a99486b52e68c2264"],["bower_components/polymerfire/firebase-common-behavior.html","04b165965f386ceba8564e629436358d"],["bower_components/polymerfire/firebase-database-behavior.html","a7c7a2d924eafaf8fa8d41d74fa3200e"],["bower_components/polymerfire/firebase-database-script.html","b280409885282a43d9b5dd1ee5226fed"],["bower_components/polymerfire/firebase-document.html","ea025843627eaa7cdc77e7117c575302"],["bower_components/polymerfire/firebase-messaging-script.html","33e0a36b60580c0bcbde7440ce9216e7"],["bower_components/polymerfire/firebase-messaging.html","eb0ac076293c4258334477cbc9c73801"],["bower_components/polymerfire/firebase-query.html","9408eb60ced1094f32809287b4956f80"],["bower_components/polymerfire/firebase-storage-script.html","73903c0e578289a5910eaad341a730ca"],["bower_components/polymerfire/polymerfire.html","b30680c8f46e57054797ffcdeafc9b20"],["bower_components/prism-element/prism-highlighter.html","6d26f844b914e66d6841ae19fb49d0c3"],["bower_components/prism-element/prism-import.html","9ed19158a2c23c9fa5cb3b2953eeefac"],["bower_components/prism-element/prism-theme-default.html","b31328e57256a2ed2f5c9cf6ca539e3b"],["bower_components/prism/prism.js","820ae7f2ab2dc246503aee80133ac093"],["bower_components/prism/themes/prism.css","298e3aafa62f48b863042aa3696a2b34"],["bower_components/promise-polyfill/Promise-Statics.js","88b4bcd4d384dde631399978842b0f2c"],["bower_components/promise-polyfill/Promise.js","65df887c5b0b9d2c1a1a22fb3292a567"],["bower_components/promise-polyfill/promise-polyfill-lite.html","76d711e41b89d594a04b3d54e9a8b685"],["bower_components/promise-polyfill/promise-polyfill.html","c15ec270e9d7e22f3d2e5967953b75de"],["bower_components/scary-gallery/scary-gallery.html","06408f2a78eb404d7b22f993015b544a"],["bower_components/scary-gallery/scary-image.html","d85b7c93ab97baa571cd18c0b2a5d424"],["bower_components/vaadin-combo-box/vaadin-combo-box-behavior.html","9ecdc4c4e77617cc8f3df2480f82652a"],["bower_components/vaadin-combo-box/vaadin-combo-box-icons.html","b3a750cee28c03fdc7507eac3abb6bc2"],["bower_components/vaadin-combo-box/vaadin-combo-box-item.html","2489e17dc3455f301719b46ba4ccf44f"],["bower_components/vaadin-combo-box/vaadin-combo-box-overlay.html","71d0f60e089b2816fd55fa492e2ff7a4"],["bower_components/vaadin-combo-box/vaadin-combo-box-shared-styles.html","9cf7b3e8e49084f04efb53f1b714cf10"],["bower_components/vaadin-combo-box/vaadin-combo-box.html","5b55078259b0b206700611954394755e"],["bower_components/vaadin-combo-box/vaadin-dropdown-behavior.html","27780e3a79d5b199e36019f6612305b0"],["bower_components/vaadin-combo-box/vaadin-overlay-behavior.html","8ef97ebe711b87e890df7fab698ab7c7"],["bower_components/vaadin-combo-box/vaadin-spinner.html","11631a76f54bf686c20e9a9a78f64c11"],["bower_components/web-animations-js/web-animations-next-lite.min.js","af49292cf4e004b70ec80330912f8154"],["bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["images/0.jpg","b1c4c321579ef4b332c9875ee776e41e"],["images/1.jpg","0f08675ec095823bdd9d2a8c8a8559f6"],["images/2.jpg","cd56f034a46064f358d6f9f887a7aea3"],["images/3.jpg","1a4adad00a20121af2c5d6423866613d"],["images/4.jpg","7fff8a2a396fe928194c0547f7da3108"],["images/5.jpg","228be3a950650836dcb66278e8eb7954"],["images/6.jpg","f2a38b7d60e182c1375acec6543f4c39"],["images/7.jpg","fbdc1a85bce1c6b8ff21ece1b058e9d0"],["images/8.jpg","453548dd8066511c6d3805021393b0e4"],["images/icon-0-75x.png","4b95c3527ea17e4b7a2da7cb090932ee"],["images/icon-1-5x.png","f424e232c5108ea91ea5e551f7b7ec67"],["images/icon-1x.png","a2c233dfdd1a6c524add258533e64321"],["images/icon-2x.png","d6ec313cc3042ca2bbf23b7bb9d740b5"],["images/icon-3x.png","78c359a2fe1c66ba73f7a349655fdb25"],["images/icon-4x.png","b8e520e80f283602f24606720eecda2f"],["images/shop-icon-128.png","7c233b5552b74a53b45f7bb8590f1b54"],["images/shop-icon-192.png","d2e93b8e0722070229467585fd1221f0"],["images/shop-icon-32.png","db2a62dbf6f348a8d557cf047956872c"],["images/shop-icon-384.png","0f3500e24fc5ce5f20f3e3d09740a7a7"],["images/social-sphere.jpg","84963efa97dad8b66011d562f26d022c"],["index.html","1abcab802889d053d96bbe7325fe1b63"],["manifest.json","d9ccafe6840e24a83bfe57a459f3507c"],["src/img/arrow.png","74235578b411780191eb61ec6c4ca583"],["src/img/arrow.psd","a489a2f9700976ff405c8413286d3678"],["src/img/arrow2.png","3a4c4050d25198fba7f4102bd39252c6"],["src/img/arrow2.psd","f826f2c1e9e96c7ea5de222456b5a0a3"],["src/img/arrow3.png","a0ae34712c2447874747abc5ae423edd"],["src/img/arrow3.psd","cb17efe2f320a02a3dd344ba76d3c18f"],["src/img/arrow4.png","3ce465807095bcc017ed5ae5f7349fbb"],["src/img/arrow4.psd","897ba9fd74d8d60cbae1db769ca3e49e"],["src/img/arrow5.png","7eb6a69e87ffb993d89b446a7390db92"],["src/img/arrow5.psd","109cb30cb1b569395b9e1fd7de96043e"],["src/lazy-resources.html","73fd5985e0c24d21b2527dfd4e2b8d02"],["src/sa-login.html","73fdf0b8b1aaa921a18841e5b95840c6"],["src/shop-404-warning.html","656d23dcd90036c4a9b4595069cf3f3a"],["src/shop-addevent.html","45fac2aabddcfc79874a764e00543e90"],["src/shop-addrandr.html","b7c07628223d35e545fe92a409655256"],["src/shop-adduser.html","5e7c72141d8b61d05153df675617f672"],["src/shop-analytics.html","f415d524d95336a29c6ada121cc7740e"],["src/shop-app.html","2bdc565e7fc919f7c7df56d7b2cf1f5e"],["src/shop-button.html","d97a72dbf7bf3b3644831405fd4f8edc"],["src/shop-checkbox.html","d356287ec3ad9b1e4c4ed57eb518705a"],["src/shop-common-styles.html","c01efa19c950f7c958c55c7287847f35"],["src/shop-detail.html","5faf421d1a90e15626246bde8eb2bf06"],["src/shop-form-styles.html","1d9090291f49fd0dddccb09251b95c84"],["src/shop-home.html","1501d2d925a42f8e595dbea622376fe3"],["src/shop-icons.html","53a21a36aa220fdb7bc0077501ae17de"],["src/shop-image.html","3944b3abda0f3f92edf859feed50e01c"],["src/shop-imagediv.html","5f29d725a4058b29e25bf515d8f04b3d"],["src/shop-input.html","ce151d35e04bbe339f83b5980776c0e0"],["src/shop-list-item.html","a4ca6fee453fd4adda02e840c9a8be5c"],["src/shop-list.html","e6105381a1a52fba282957141b278395"],["src/shop-network-warning.html","d5bb2122d57faeabe3d6a302bfa024c3"],["src/shop-rewardlist-item.html","74665801bd569717ed6eba3a0b13106b"],["src/shop-rewards.html","2e7f389e6e3d04bce7dfc438baa64818"],["src/shop-rewardslist.html","52f0d6c2eca846d08d44e41b4e4998bd"],["src/shop-ripple-container.html","77157af0471b2fe75b1a6d675aca2255"],["src/shop-select.html","f165f670307a1d61f7ea8e8d61671575"],["src/shop-snackbar.html","50d185275119f5f385e3f101461a3086"],["src/shop-tab.html","cf1e289d929ac6a516a77d5bd389b433"],["src/shop-tabs-overlay.html","97bb053cf51e24695352b7464f398e2b"],["src/shop-tabs.html","b41469a1b8233853f08587e9363a5508"],["src/shop-teams.html","3977f83ba37d8656ff913f003f3905cc"],["src/shop-viewevent.html","d4c74e38ed354e187813e27289baa64c"],["src/ss-fire.html","e8d420a187146209ce9d25d954a26cb3"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/bower_components\/webcomponentsjs\/.*.js/, toolbox.fastest, {"cache":{"name":"webcomponentsjs-polyfills-cache"}});
toolbox.router.get(/\/data\/images\/.*/, toolbox.cacheFirst, {"cache":{"maxEntries":200,"name":"items-cache"}});
toolbox.router.get(/\/data\/.*json/, toolbox.fastest, {"cache":{"maxEntries":100,"name":"data-cache"}});




