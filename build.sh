# Run using ./build.sh

# Concat javascript files into one file
cat \
    js/assets.js \
    js/audio.js \
    js/display.js \
    js/engine.js \
    js/entities.js \
    js/game.js \
    js/input.js \
    js/pool.js \
    js/ZzFXMicro.min.js \
    js/stage.js \
    js/setup.js \
    > build/game.js

# Uglify JS
uglifyjs build/game.js -c drop_console=true --compress --mangle -o build/game.min.js

# Uglify CSS
uglifycss style.css --output build/style.min.css

# Embed CSS into HTML
sed -e '/CSS_SOURCE/{r build/style.min.css' -e 'd}' build/html_template.html > build/css_ready.html

# Embed JS into HTML
sed -e '/GAME_SOURCE/{r build/game.min.js' -e 'd}' build/css_ready.html > build/index.html

# Build gzip
gzip -9 -c build/index.html > build/index.html.gz

# Clean
rm build/game.js
rm build/css_ready.html

# Display output size
unzip=$(ls -l build/index.html | awk '{print $5}')
zipped=$(ls -l build/index.html.gz | awk '{print $5}')
echo "Unzipped size: $unzip bytes"
echo "GZip size: $zipped bytes"

