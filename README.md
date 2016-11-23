# DEPRECATION NOTICE

This library is no longer maintained. The mobile app platform is now leaning towards a standard where regular URLs (more or less) redirect to an app. This involves hosting separate files, something this library cannot do for you.

- Android [App Links](https://developer.android.com/training/app-links/index.html)
- iOS [Universal Links](https://developer.apple.com/library/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html)

I discourage using this library and encourage using this new standard instead.

# applink.js

**applink.js** is designed to add deep links to the web in an easy and stable way.

Mobile deep links are links that refer to apps instead of another web page. Opening things in apps can vastly improve a user’s experience.

## Usage

```html
<a class="fu-join"
	data-deeplink="deep-link"						// App内跳转地址
    href="download-link"							// 服务器端设置的根据UA判断的自动跳转链接，包含下面4中情况
    data-href-android="android-download-link"		// Android包下载地址
    data-href-ios="itunes-link"						// itunes地址
    data-href-qq-android="myapp-link"				// 应用宝推广地址
    data-href-qq-ios="myapp-link">立即打开</a>		// 应用宝推广地址
```

Mobile deep links are not intended for desktops, so there are several fallbacks, in this order:

1. Open the deep link
2. Open the app in the store (if present)
3. Go to the href attribute (if present)
4. Absolutely nothing
The more information you supply, the better.


# License

applink.js is licensed under the MIT license.
[http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)

# Changelog

## 0.2.1
- 删除bower支持；
- 适当重构

## 0.1.1
- Add intent for modern Android browsers

## 0.1.0

- Add Windows Phone support
- Trying to correctly use semver

## 0.0.5

- Improved workflow
- Added “visibly.js” – A Page Visible API polyfill
- Some minor optimisations

## 0.0.4

Uhhhm, the bower file changed and listed a first release.

## 0.0.3

- iOS store prefix includes 'id'
- Added a comment for later use
- Reinstated the requirement of empty-ish href attribute before hiding a link

## 0.0.2 (wrongly named to 1.0.2)

- Some minor changes

## 0.0.1

- Initial release
