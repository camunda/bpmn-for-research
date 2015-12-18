# bpmn-for-research site

Generates the BPMN for Research site in the `gh-pages` branch.


## Setup

```
npm install
```


## Build Site


During development (including webserver):

```
npm run dev
```


For site release:

```
npm run build
```

__For Windows users instead__:

Copy contents from `static` to dist and execute `npm run build:html && npm run build:css`.


## Publish

Update `gh-pages` branch with contents in `dist` folder. Enjoy!