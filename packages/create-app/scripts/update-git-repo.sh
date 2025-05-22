#!/bin/bash
# Inspired by Svelte Kit

get_abs_filename() {
  # $1 : relative filename
  echo "$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
}

DIR=$(get_abs_filename $(dirname "$0"))
TMP=$(get_abs_filename "$DIR/../node_modules/.tmp")

mkdir -p $TMP
cd $TMP

# Set git info
git config --global user.email "1234yamd@gmail.com"
git config --global user.name "yamz8"

# clone the template repo
rm -rf nopends-ui-template
git clone --depth 1 --single-branch --branch main https://github.com/nopends/nopends-ui-template.git

# empty out the repo
cd nopends-ui-template
node $DIR/update-git-repo.js $TMP/nopends-ui-template

# commit the new files
git add -A
git commit -m "version $npm_package_version"

git push https://github.com/nopends/nopends-ui-template.git main -f