jdandrade.com
=============

Source code of my personal website


## Instalation Instructions

1. Open terminal and run this command: `npm i`
2. To generate a production code, run: `npm build`

## Tech Stack
- [PostCSS](http://postcss.org/)
- [Stylelint](https://stylelint.io/)

## Project Structure

- config/ (Project configuration)
- src/ (development)
	- styles/
		- core (Base/global styles)
		- elements (Small components)
		- modules (Building blocks)
		- settings (Project configuration)
- public/ (static files)

## Architecture

Included new CSS features as:
- [Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
- [Custom media queries](https://drafts.csswg.org/mediaqueries/#custom-mq)
- [Nesting](http://tabatkins.github.io/specs/css-nesting/)
- [Colors](https://drafts.csswg.org/css-color/#modifying-colors)

### Why I choose this approach?
I decided to use the current state of the art in order of take advantage of the new features that CSS give us. As not all of the browsers support these features, to avoid browser compatibility issues, I used PostCSS as a transformer/"transpiler" similar to what Babel does with ES6.
