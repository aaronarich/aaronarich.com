---
title: I Asked an AI to Roast My Hand-Coded Website
date: 2026-03-16 00:00:00 Z
categories:
- posts
author: Aaron A. Rich
layout: post
---

This site was hand-coded in 2017. I designed it in Sketch, wrote every line of HTML, CSS, and JavaScript by hand, and was genuinely proud of it. It launched over Labor Day weekend, I wrote [a whole post about the tools I used]({{ site.url }}/posts/2017/09/05/hello-world/), and then I mostly left it alone for eight years.

Then I asked an AI to read every file in the repository. I told it to roast me.

Reader, it did not hold back.

### jQuery 1.12.4, Loaded for One Thing

The About page shows my top four Last.fm albums from the past week. A fun little widget! To pull that data, I loaded jQuery — the full jQuery, version 1.12.4, released in 2016 — in the `<head>` of a single page. One script tag, one AJAX call, 87kb of library.

The native `fetch()` API has been available in every major browser since 2017. It ships with zero dependencies. It is, in fact, already there. But 2017 Aaron needed jQuery, so jQuery was loaded.

### The Great Copy-Paste Instead of a Loop

Once jQuery finishes loading and the Last.fm data comes back, here's how I populated the four album widgets:

```javascript
$(".albumArt0").html('<a href="' + data.topalbums.album[0].url + '">...');
$(".albumName0").html('<a href="' + data.topalbums.album[0].url + '">...');
$(".albumArtist0").html('by ' + data.topalbums.album[0].artist.name);

$(".albumArt1").html('<a href="' + data.topalbums.album[1].url + '">...');
$(".albumName1").html('<a href="' + data.topalbums.album[1].url + '">...');
$(".albumArtist1").html('by ' + data.topalbums.album[1].artist.name);

$(".albumArt2").html('<a href="' + data.topalbums.album[2].url + '">...');
// ...you get the idea
```

Twelve lines of nearly identical code. Repeated four times. A `for` loop could have done this in three. The loop was right there, in the language, free of charge, waiting patiently. I did not use it.

### The IIFE That Protected jQuery and Nothing Else

The time-based greeting on the homepage wraps everything in a self-invoking function to avoid polluting the global scope with a jQuery alias. Solid defensive programming! And then, inside that protected scope, I wrote:

```javascript
(function($) {
  var currentTime = new Date();
  if ( currentTime.getHours() < 12 ) {
    salutation = "Good&nbsp;Morning";  // no var, let, or const
  }
  // ...
  $(".greeting").append(salutation);
}(jQuery));
```

`salutation` has no `var`, no `let`, no `const`. It is a global variable. The very thing the IIFE wrapper was trying to prevent. I locked the front door and left the window wide open.

### The Branch That Could Never Be Reached

The greeting logic has four conditions: morning, afternoon, evening, and a final `else`. Here's the evening check:

```javascript
if ( currentTime.getHours() > 17 && currentTime.getHours() <= 24 )
```

Hours in JavaScript run from 0 to 23. There is no hour 24. Midnight is hour 0. The condition `<= 24` is technically always true for valid hours, but the condition `> 17 && <= 24` will never, ever fail to match for any evening hour — meaning the final `else` block, which says `salutation = "Hello!"`, is unreachable dead code.

It has been sitting there since 2017. Waiting. It will wait forever.

### `&nbsp;` in a JavaScript String

`"Good&nbsp;Morning"` is the string that gets injected into the DOM via jQuery's `.append()`. An HTML entity, living inside a JavaScript string, inserted as raw HTML. It works — browsers are very forgiving — but it's the kind of thing that makes a linter want to lie down.

### The API Key in the Source

The Last.fm API key is hardcoded directly in the HTML `<head>`, visible to anyone who opens View Source. It's a read-only key for a music scrobbling service, so the actual blast radius here is approximately zero — but I am a front-end developer who apparently shipped production credentials to a public repository and left them there for eight years.

### 5,826 Lines of SCSS for a Portfolio Site

This site uses [Tachyons CSS](https://tachyons.io/) — specifically the SCSS port — which is a utility-first framework that generates classes with names like `ph6-ns` (padding-horizontal, scale step 6, not-small breakpoint) and `fl-ns` (float-left, not-small). There are over 70 SCSS files and 5,826 lines of CSS to style a site with four pages and a blog.

To be fair, I did not write most of those lines. I just... imported all of them.

### The Debug Modules That Stayed

Among those 70+ imports: `debug`, `debug-children`, and `debug-grid` — Tachyons utilities that outline every element on the page with colored borders to help diagnose layout issues. They were imported for development. They were never removed. They have been deployed to production since 2017, doing nothing, contributing to the CSS bundle, living their best lives.

### What 2017 Aaron Got Right

In the interest of fairness: the HTML is semantic and properly structured. There are real `aria-label` attributes. The site is responsive. The gradient text effect is clean. It loads fast, it's been up for eight years without breaking, and it still looks exactly how I intended it to look. That's not nothing.

---

I asked an AI to roast my code, and it did — thoroughly, methodically, and with complete accuracy. The uncomfortable part isn't that the code has problems. The uncomfortable part is that I shipped this as a front-end developer, left it untouched for nearly a decade, and it worked fine the whole time.

Maybe that's the real roast.