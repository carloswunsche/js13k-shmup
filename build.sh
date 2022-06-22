# Run using ./build.sh

# Remove images directory (build/i) and its contents
rm -r build/i

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

# Roadroll JS
roadroller -Zab32 -Zdy0 -Zlr1500 -Zmd50 -S0,1,2,3,6,7,13,21,50,57,173,458 build/game.min.js -o build/game.roadrolled.js

# Uglify CSS
uglifycss style.css --output build/style.min.css

# Embed CSS into HTML
sed -e '/CSS_SOURCE/{r build/style.min.css' -e 'd}' build/html_template.html > build/css_ready.html

# Embed JS into HTML
sed -e '/GAME_SOURCE/{r build/game.roadrolled.js' -e 'd}' build/css_ready.html > build/index.html

# Copy assets (i) folder into build
cp -a i build/

# Build gzip of tar archive containing index.html and assets (i) folder
cd build
tar -czf final.tar.gz index.html i
cd ..

# Get file sizes before cleaning
gamesize=$(ls -l build/index.html | awk '{print $5}')
imagessize=$(du -sb build/i | awk '{print $1}')
zippedsize=$(ls -l build/final.tar.gz | awk '{print $5}')

# Clean
rm build/game.js
rm build/game.min.js
rm build/game.roadrolled.js
rm build/style.min.css
rm build/css_ready.html

# Display game logic and tar.gz sizes
echo "Game size: $gamesize bytes"
echo "Images size: $imagessize bytes"
echo "GZip size: $zippedsize bytes"


# History of build sizes (in bytes):
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
# -7795 (I can't remember...)
# -7764 (Some more shrinking here and there)
# +7821 (new particle system)