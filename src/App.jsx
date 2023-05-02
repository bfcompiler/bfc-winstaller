// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './Store';
import FallbackPage from './pages/Fallback';
const LicensePage = lazy(() => import("./pages/License"));
const MSYS2DownloaderPage = lazy(() => import("./pages/MSYS2Downloader"));
const WarningPage = lazy(() => import("./pages/Warning"));
const BFCDownloaderPage = lazy(() => import("./pages/BFCDownloader"));
const CompletePage = lazy(() => import("./pages/Complete"));
const RerunPage = lazy(() => import("./pages/Rerun"));

const route = createBrowserRouter([
	{
		path: "/",
		element: <Suspense fallback={FallbackPage}><LicensePage /></Suspense>
	},
	{
		path: "/warning",
		element: <Suspense fallback={FallbackPage}><WarningPage /></Suspense>
	},
	{
		path: "/msys2-downloader",
		element: <Suspense fallback={FallbackPage}><MSYS2DownloaderPage /></Suspense>
	},
	{
		path: "/bfc-downloader",
		element: <Suspense fallback={FallbackPage}><BFCDownloaderPage /></Suspense>
	},
	{
		path: "/complete",
		element: <Suspense fallback={FallbackPage}><CompletePage /></Suspense>
	},
	{
		path: "/rerun",
		element: <Suspense fallback={FallbackPage}><RerunPage /></Suspense>
	}
]);

ReactDOM.render(<Provider store={store}><RouterProvider router={route} /></Provider>, document.getElementById("root"));