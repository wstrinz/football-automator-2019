# Userscript Typescript template

Use Typescript to write userscripts for Tampermonkey/Greasemonkey/etc.

## Setup

- `npm install`

## How to use

(Currently only tested with [Violentmonkey](https://violentmonkey.github.io))

In two separate terminals, run

- `npm run dev`
- `npm run serve`

Now just open the editor of your choice to `src/index.ts`. Any changes you make will be automatically compiled.

The generated user script can now be found at http://localhost:8000/build/script.user.js .

Refer to the "Hard Way" section of the [Violentmonkey local scripts](https://violentmonkey.github.io/2017/03/14/How-to-edit-scripts-with-your-favorite-editor/#install-a-local-script) instructions. Don't forget to tick the "track local file changes" box.

## To Do

- [ ] merge `dev` and `serve` into one task
- [ ] clean up / optimize webpack build
- [ ] watch for changes to script_header.js
- [ ] figure out how best to make it work with Tampermonkey