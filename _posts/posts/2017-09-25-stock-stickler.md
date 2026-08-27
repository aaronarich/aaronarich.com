---
title: Stock Stickler (A Proof of Concept)
date: 2017-09-25 00:00:00 Z
categories:
- posts
author: Aaron A. Rich
layout: post
---

This is a proof-of-concept for a simple app that can pull in live Stock Market JSON data.

I created this over the weekend as a way of solving an issue for my Grandmother. Her use case is that she's 92, has poor eyesight, and loves checking her stocks. She used to do this over the phone several times per day, but after receiving an iPad she prefers to check them out in real-time online.

While the native iOS app that ships on iPhones would be the perfect candidate for simply checking stock prices, it doesn't ship on iPads. We found one or two different Stock Portfolio apps that do provide the values and changes, but they weren't great and also weren't actively maintained by their developers. Other stock apps on the App Store tend to be distributed by financial companies and provide portfolio management tools (read: overkill).

For lack of a better option, I decided to create this web app as a proof-of-concept that I could pull market data in real-time and present it in a large-type display that looks great on iPad. Thanks to the code [here](https://github.com/aaronarich/stock-stickler/blob/20e117267cfff8e9b0abee411e28765950e7b9aa/source/layouts/layout.erb#L9-L11), the app can be saved to the home screen and then appear as a standalone faux-app. The app can then be opened in a headless instance of Safari, which helps streamline the display and prevent clicking on buttons/options that are not related.

While this does require me to update and deploy changes to her portfolio manually, it also puts the power in my hands to adjust things to her liking from afar, as she lives in Asheville. I can then deploy my changes without needing to walk her through how to go to the App Store and download a new version. This project will continue to see improvements as I hope to add new features in the future.

{% include image.html src="/assets/posts/stock-stickler/stock-stickler" alt="Stock Stickler on iPad" width=1200 height=1682 class="w-100" eager=true %}


- See it live here [https://stocks.aaronarich.com/](https://stocks.aaronarich.com/)
- Source here [https://github.com/aaronarich/stock-stickler](https://github.com/aaronarich/stock-stickler)
- Data provided for free by [IEX Developer Platform](https://iextrading.com/developer/)
