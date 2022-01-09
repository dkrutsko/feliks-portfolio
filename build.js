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

// Returns prev element in the array and wraps if reaches the head
handlebars.registerHelper ('prevItemWrap', function (array, index)
{
	if (!Array.isArray (array))
		throw new Exception ('Must pass array to #prevItemWrap');

	if (typeof index !== 'number')
		throw new Exception ('Must pass index to #prevItemWrap');

	return array[index - 1 < 0 ? array.length - 1 : index - 1];
});

// Returns next element in the array and wraps if reaches the tail
handlebars.registerHelper ('nextItemWrap', function (array, index)
{
	if (!Array.isArray (array))
		throw new Exception ('Must pass array to #nextItemWrap');

	if (typeof index !== 'number')
		throw new Exception ('Must pass index to #nextItemWrap');

	return array[index + 1 >= array.length ? 0 : index + 1];
});

fs.writeFileSync (INDEX_HTML,
	INDEX_TMPL
	({
		thumbs: THUMB_NAMES,
		photos: PHOTO_NAMES
	})
);
