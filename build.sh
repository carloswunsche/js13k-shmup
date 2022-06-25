# Run using ./build.sh

# Remove build images directory (build/i) and its contents
rm -r build/i
mkdir build/i

# Copy source png's from /source_images into /i
cp source_images/sprites.png i/
cp source_images/bg.png i/

# Compress webp images from /source_images and save them into /i
# cwebp -lossless -z 9 -quiet sprites.webp  -o sprites.webp
# cwebp -lossless -z 9 -quiet bg.webp       -o bg.webp


cd i
# Color quantization (+dither means NO dithering)
magick sprites.png  +dither -colors 9 sprites.png
magick bg.png       +dither -colors 5 bg.png
# Convert from png to webp
cwebp -lossless -z 9 -quiet sprites.png  -o sprites.webp
cwebp -lossless -z 9 -quiet bg.png       -o bg.webp
# Remove png's
rm sprites.png
rm bg.png
cd ..

# Concat javascript files into one file
cat \
    js/customMath.js \
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
# cp -a i build/
cp i/sprites.webp build/i
cp i/bg.webp build/i

# Build gzip of tar archive containing index.html and assets (i) folder
cd build
tar -czf final.tar.gz index.html i
cd ..

# Get file sizes before cleaning
gamesize=$(ls -l build/index.html | awk '{print $5}')
imagessize=$(du -sb build/i | awk '{print $1}')
sprites=$(ls -l build/i/sprites.webp | awk '{print $5}')
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
echo "Sprites only size: $sprites bytes"
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

# (using cwebp to compress images from the command line)