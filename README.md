# BlueFoxDomGate

## install

```bash
npm install https://github.com/xoFeulB/BlueFoxDomGate.git
```

## usage

```bash
Options:
  index     path to index.html                                    [string]
  root      gate src root                                         [string]
  out       path to <output>.html       [string] [default: "./index.html"]
  depth     path to output directory             [number] [default: 10000]
  prettier  enable prettier                      [boolean] [default: true]
  minify    enable minify                        [boolean] [default: false]
```

```javascript
import { BlueFoxDomGate } from "@xofeulb/bluefox-domgate";

await BlueFoxDomGate.connect(
  "./index.html", //index
  "./", //root
  "./dist/o.html", //out
  10000, //depth
  true, //prettier
  true //minify
);
```

## input

./index.html

```html
<!doctype html>
<html>
  <head> </head>

  <body>
    <gate src="./panel/destination.html"></gate>
  </body>
</html>
```

./panel/destination.html

```html
<div>destination</div>
```

## result

```html
<!doctype html>
<html>
  <head> </head>

  <body>
    <div>destination</div>
  </body>
</html>
```
