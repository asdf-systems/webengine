#!/bin/bash
echo 'usage: [srcFolder] [outFile]';
echo 'found: srcFolder : ' ;
echo $1;
echo 'found outFile: ';
echo $2

cat $1/elements/Button.js > tmp.js;
cat $1/elements/Panel.js >> tmp.js;
cat $1/elements/Image.js >> tmp.js;
cat $1/elements/Textfield.js >> tmp.js;
cat $1/elements/PagePanel.js >> tmp.js;
cat $1/elements/RolloutPanel.js >> tmp.js;
cat $1/elements/HVPanel.js >> tmp.js;
cat $1/elements/AccordionPanel.js >> tmp.js;
cat $1/elements/BackgroundStitcher.js >> tmp.js;
cat $1/EngineShow.js >> tmp.js;
cat $1/EngineEvents.js >> tmp.js;
cat $1/EventParameter.js >> tmp.js;
cat $1/Engine.js >> tmp.js;
cat $1/Size.js >> tmp.js;

./jsmin.exe < tmp.js > $2;
rm tmp.js;
echo 'finished';


