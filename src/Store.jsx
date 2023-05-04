// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { configureStore } from '@reduxjs/toolkit';

import UrlContentsReducer from './slices/UrlContents';
import DownloadedFileReducer from './slices/DownloadedFile';
import ExtractXZTarReducer from './slices/ExtractXZTar';
import DeleteFileReducer from './slices/DeleteFile';
import BashCommandReducer from './slices/BashCommand';
import SetupMsys2Reducer from './slices/SetupMsys2';
import UnzipFileReducer from './slices/UnzipFile';
import SetupBfcReducer from './slices/SetupBfc';

export default configureStore({
	reducer: {
		urlContents: UrlContentsReducer,
		downloadedFile: DownloadedFileReducer,
		extractXZTar: ExtractXZTarReducer,
		deleteFile: DeleteFileReducer,
		bashCommand: BashCommandReducer,
		setupMsys2: SetupMsys2Reducer,
		unzipFile: UnzipFileReducer,
		setupBfc: SetupBfcReducer
	}
});