rem Simple build script for LittleJS Engine by Frank Force
rem minfies and combines index.html and index.js and zips the result

rem --- BUILD ENGINE DEBUG ---

set OUTPUT_FILENAME=engine.all.js

rem remove old files
del %OUTPUT_FILENAME%

rem combine code
type engineDebug.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineUtilities.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineSettings.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineObject.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineDraw.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineInput.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineAudio.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineTileLayer.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineParticles.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineMedals.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineWebGL.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engine.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%

rem --- BUILD ENGINE RELEASE ---

set OUTPUT_FILENAME=engine.all.release.js

rem remove old files
del %OUTPUT_FILENAME%

rem combine code
type engineRelease.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineUtilities.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineSettings.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engine.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineObject.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineDraw.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineInput.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineAudio.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineTileLayer.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineParticles.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineMedals.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%
type engineWebGL.js >> %OUTPUT_FILENAME%
echo.>> %OUTPUT_FILENAME%

@REM rem --- BUILD ENGINE MINIFIED ---

@REM set OUTPUT_FILENAME=engine.all.min.js

@REM rem remove old files
@REM del %OUTPUT_FILENAME%

@REM rem start with release build
@REM copy engine.all.release.js %OUTPUT_FILENAME%

@REM rem check code with closure
@REM move %OUTPUT_FILENAME% %OUTPUT_FILENAME%.temp
@REM call npx google-closure-compiler --js=%OUTPUT_FILENAME%.temp --js_output_file=%OUTPUT_FILENAME% --language_out=ECMASCRIPT_2019 --warning_level=VERBOSE --jscomp_off=*
@REM del %OUTPUT_FILENAME%.temp
@REM if %ERRORLEVEL% NEQ 0 (
@REM     pause
@REM     exit /b %ERRORLEVEL%
@REM )

@REM rem lightly minify with uglify
@REM call npx uglifyjs -o %OUTPUT_FILENAME% -- %OUTPUT_FILENAME%
@REM if %ERRORLEVEL% NEQ 0 (
@REM     pause
@REM     exit /b %ERRORLEVEL%
@REM )

rem --- BUILD TYPESCRIPT DEFINITIONS ---
call npx tsc engine.all.js --declaration --allowJs --emitDeclarationOnly --outFile index.d.ts
if %ERRORLEVEL% NEQ 0 (
    pause
    exit /b %ERRORLEVEL%
)