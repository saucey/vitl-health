// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// DOM libs required for Firebase
// (global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { join } from 'path';

import {redirections} from './redirections';

import {environment} from './src/environments/environment';

const PORT = process.env.PORT || 4000;
const BASE_FOLDER = process.cwd();
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'service-web';

const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP
} = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

const app = express();

app.use(compression());

app.use(cookieParser());

app.use((req, res, next) => {
  res.set('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// Set the engine
app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)]
    })
);

app.set('view engine', 'html');

// Redirections

for (const redirection of redirections) {
    app.get(redirection.from, (req, res) => { res.redirect(redirection.code, redirection.to); });
}

app.get('/unsubscribe/:category', (req, res) => {
    res.redirect(301, `/email/unsubscribe/${req.params.category}/${req.query.email}`);
});

app.get('/tracking/email/click/:id/:url', (req, res) => {
    res.redirect(301, `https://tracking.vitl.com/email/click/${req.params.id}/${req.params.url}`);
});

app.get('/app/magic/*', (req, res) => {
    res.redirect(301, req.path.replace('/app/magic', '/exchange'));
});

// Additional assets
app.use(express.static(join(BASE_FOLDER, 'statics')));

// Static Assets - images etc.
app.get('*.*', express.static(DIST_FOLDER));

app.get('/**/*', (req, res, next) => {
    try {
        res.render(join(DIST_FOLDER, 'index'), {
            req,
            res
        });
    } catch (err) {
        next(err);
    }
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER));

// Point all routes to Universal
app.get('*', (req, res, next) => {
    try {
        res.render('index', { req, res });
    } catch (err) {
        next(err);
    }
});

// Start Express Server
app.listen(PORT, () => {
    console.log(environment.api_endpoint);
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
