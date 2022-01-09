#!/usr/bin/env node

const path       = require ('path'       );
const fs         = require ('fs'         );
const handlebars = require ('handlebars' );

const THUMBS_DIR = path.join (__dirname, 'thumbs');
const PHOTOS_DIR = path.join (__dirname, 'photos');

const reduceImages = function (prev, curr)
{
	curr = path.parse (curr.toLowerCase());
	// Only select JPGs that don't have the @2x in the name
	if (curr.ext === '.jpg' && !curr.name.includes ('@2x'))
		prev.push (curr.name);

	return prev;
};

const THUMB_NAMES = fs.readdirSync (THUMBS_DIR).reduce (reduceImages, [ ]).sort().reverse();
const PHOTO_NAMES = fs.readdirSync (PHOTOS_DIR).reduce (reduceImages, [ ]).sort().reverse();

const INDEX_HTML    = path.join (__dirname, 'index.html');
const INDEX_HBS     = path.join (__dirname, 'index.hbs' );
const INDEX_CONTENT = fs.readFileSync (INDEX_HBS, { encoding:'utf8' });
const INDEX_TMPL    = handlebars.compile (INDEX_CONTENT);

Number.prototype.mod = function (n)
{
  return ;
};


// Returns the element in the array that is an amount away from the index
handlebars.registerHelper ('seqItemWrap', function (array, index, amount)
{
	if (!Array.isArray (array))
		throw new Exception ('Must pass array to #nextItemWrap');

	if (typeof index !== 'number')
		throw new Exception ('Must pass index to #nextItemWrap');

	if (typeof amount !== 'number')
		throw new Exception ('Must pass amount to #nextItemWrap');

	// https://stackoverflow.com/q/4467539
	// JavaScript has a bug performing modulo when negative numbers are being used
	return array[(((index + amount) % array.length) + array.length) % array.length];
});

fs.writeFileSync (INDEX_HTML,
	INDEX_TMPL
	({
		thumbs: THUMB_NAMES,
		photos: PHOTO_NAMES
	})
);
