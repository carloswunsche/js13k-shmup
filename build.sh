# --------------------------------------------------- #
#         BUILD SCRIPT (Run using ./build.sh)         #
# --------------------------------------------------- #



# -------------- SETTING UP ENVIRONMENT ------------- #
# Remove previous build directory (hide output and error if directory doesn't exist)
rm -rfv -f build/* > /dev/null

# Create directories
mkdir build
mkdir build/img-source
mkdir build/img

# Copy source PNG's into build/img
cp sources/sprites-3-colors-indexed-gimp.png build/img-source/sprites-source.png
cp sources/bg-4-indexed-colors-gimp.png build/img-source/bg-source.png

# Copy js directory and its contents into build
cp -r js build/js-source

# Copy style.css into build
cp style.css build/style-source.css

# Copy HTML template from sources into build
cp sources/html-template.html   build/html-template.html

# Move to build directory
cd build



# ---------------------- IMAGES --------------------- #
# Move to build/img directory
cd img-source

# Convert from PNG to WEBP with loseless compression and maximum effort
cwebp -lossless -z 9 -quiet sprites-source.png  -o ../img/sprites.webp
cwebp -lossless -z 9 -quiet bg-source.png       -o ../img/bg.webp

# Only for Development: Convert again but put output in root /img folder
# cwebp -lossless -z 9 -quiet sprites-source.png  -o ../../img/sprites.webp
# cwebp -lossless -z 9 -quiet bg-source.png       -o ../../img/bg.webp

# Go back to build directory
cd ..



# -------------- JAVASCRIPT GAME LOGIC -------------- #
# Enter scripts source directory
cd js-source

# Concatenate JavaScript files and put the output in parent directory
cat \
    ZzFXMicro.min.js \
    customMath.js \
    assets.js \
    entities.js \
    stage.js \
    engine.js \
    input.js \
    game.js \
    audio.js \
    display.js \
    pool.js \
    main.js \
    > ../script.concat.js

# Go back to parent directory (build)
cd ..

# Uglify JS (minifies JavaScript file)
uglifyjs script.concat.js -c drop_console=true --compress --mangle -o script.min.js

# Roadroll JS (compresses JavaScript file)
# roadroller script.min.js -o script.roadrolled.js
roadroller -Zab32 -Zdy0 -Zlr1000 -Zpr14 -S0,1,2,3,6,7,13,25,42,57,453,505 script.min.js -o script.roadrolled.js



# ----------------- FINAL HTML FILE ----------------- #
# Uglify CSS (minifies CSS file)
uglifycss style-source.css --output style.min.css

# Embed CSS into HTML
sed -e '/CSS_SOURCE/{r style.min.css' -e 'd}' html-template.html > html-css.html

# Embed JS into HTML
sed -e '/GAME_SOURCE/{r script.roadrolled.js' -e 'd}' html-css.html > html-css-js.html

# Minify HTML
html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype html-css-js.html --output index.html

# --- COMPRESS, FILL DIST FOLDER AND DISPLAY INFO --- #
# Build gzip of tar archive containing index.html and images folder
tar -czf game.tar.gz index.html img

# Copy final files into dist folder
cp game.tar.gz ../dist
cp index.html ../dist
cp -r img ../dist

# Get file sizes 
minisize=$(ls -l script.min.js | awk '{print $5}')
roadsize=$(ls -l script.roadrolled.js | awk '{print $5}')
imagessize=$(du -sb img | awk '{print $1}')
zippedsize=$(ls -l game.tar.gz | awk '{print $5}')

# End displaying game logic and tar.gz sizes
echo "Minified   js size: $minisize bytes"
echo "Roadrolled js size: $roadsize bytes"
echo "Images size: $imagessize bytes"
echo "GZip size: $zippedsize bytes"

# Exit build directory
cd ..



# --------- HISTORY OF BUILD SIZE (IN BYTES) -------- #
# -10116 (roadroller implementation)
# -9917 (compressing most images to webp + 15 color limit)
# -9916 (changing event function system)
# -9777 (without firefox scrolling support)
# -9347 (compressing background to webp + 5 color limit)
# -9233 (removing 120hz functionality and step intervention)
# -9123 (removing unused stuff from engine and some debug functions)
# -9105 (simplifying render background function)
# -7977 (simpler backgrounds and new SINGLE standarized spritesheet (8 color limit))
# -7903 (simplified sintax on stage.js)
# -7898 (simplified sintax on audio.js a bit)
# -7890 (simplified sintax on collisions a bit)
# -7861 (unused functions on stage.js)
# -7853 (simplified code on setup.js)
# -7795
# -7764 (Some more shrinking here and there)
# +7816 (new particle system)
# -7802 (some optimizations)
# -7798 (some optimizations)
# +8049 (new explosion system + sound fixed)
# +8084 (further polishing of particle system)
# -8075 (before changing the architecture)
# +8129 (after changing architecture...)
# +8145 (after improving architecture...)
# -8111 (cleaning entities.js)
# -8087 (using timers for player shot)
# +8118 (standarizing vector movement)
# +8147
# +8226
# +8291 (better pattern 1, comfortable method of reducing image color, and lighter player movement) 
# +8549 (more particles logic and item/power up system)
# +8706 (new palette system!)
# +8774 (11 different palettes) (thats TOO much hahha we will lower this number eventually)
# +8978 (more palettes, palette swap, new enemy (boat))
# -8935 (new image that has less and less pixels from left to right)
# -8905 (letting roadroller do its thing several times, without specifying parameters)
# +8915 (using greyscale bg)
# +8939 (using greyscale bg with custom background palettes also)
# -8397 (using new limited tileset (9 tiles) of solid background image, and ligther decompression algorithm for bigPattern)
# -8366 (same as before but greyscale bg image (needs it's own palette) Also reduce total palette number to only used ones)
# +8499 (back to colored background (limit 5 colors)
# +8485 = even less tiles on bg
# +8488 = now a palette of 5 colors can be selected for bg!
# -8547 = only 2 background palettes more...
# +8580 = better collision system...
# -8573 = better pool/layer comunication
# +8742 = new and better fading system with a fair amount of options
# -8729 = new eBullet without sprite, renders the same as particles
# -8719 = wow y eso q no toque mucho
# +8871 = improved graphics system! assets can now generate 48 extra more graphics using the same source!
# +9046 = Touch screen implementation
# +9302 = Midboss + better architecture
# +9377 = New big explosion for midboss (needs refactoring)
# -9315 = ligher deadbound system + killExplosions refactored
# +9347 = last time I tested ()
# -9316 = stage refactoring
# -9194 = halving source image tile quantity and reducing indexed colors from 5 to 3 + transparency
# -8999 = without using a compressed bigPattern! Well, it also has no number over 9, so thats a 1-digit-everything.
# +9080 = forgot to add 16 rox in maps (higher size array)
# -9072 = fixed bugs related to new bg system, I still need to remove the 16th row from the array
# -8979 = 15 row maps now!
# +9017 = volvimos a 16 row porque 15 era para problemass
# +9369 = Adding more CSS and HTML and using html-minify