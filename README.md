# dashboard

[![Netlify Status](https://api.netlify.com/api/v1/badges/f7bf6221-3f0b-4f52-91e7-ae62094d0d0e/deploy-status)](https://app.netlify.com/sites/eventzimmer-dashboard/deploys)

The `dashboard` repository contains all source code for the website displayed at [dashboard.eventzimmer.de](https://dashboard.eventzimmer.de).

It is used to manage organization of `locations`, `sources` and `events`.

## Setup

`dashboard` is based on:
- [Vue](http://vuejs.org)
- [Bootstrap](https://getbootstrap.com/)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Below instructions will give you a local version of `dashboard` up and running, assuming that you have `node` and `npm` installed:

```
git clone https://github.com/eventzimmer/dashboard.git
cd site/
npm install
```

To build a production version of `dashboard`:
```
cd dist/
python3 -m http.server # will serve a version of the website on http://localhost:8080
```

`dashboard` is a `vue-cli` based project. A full reference can be found [in their documentation](https://cli.vuejs.org/config/).

### Running a local backend

`dashboard` defaults all requests to `localhost:3000`. You can use `VUE_APP_ENDPOINT` to control this behaviour. In order to use the local backend, please have a look at the [schema manual](https://github.com/eventzimmer/schema/blob/master/SETUP.md), in order to set it up.
