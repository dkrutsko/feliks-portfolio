#!/usr/bin/env node

const path       = require ('path'       );
const fs         = require ('fs'         );
const handlebars = require ('handlebars' );

const PHOTO_NAMES =
[
	// Misc
	'2022_01_09_06goh31n',
//	'2012_07_02_fhaeq7b6',

	// Cube
	'2018_08_08_vzlxnj27',
	'2021_25_12_ekib19bh',
	'2021_25_12_cbg66gv8',

	// Staircase
	'2013_03_11_pstwgoxr',
	'2013_27_09_syjsikw6',
	'2013_27_09_54hqq7g8',
//	'2013_27_09_sllpvtgb',
//	'2013_27_09_1yd22h40',
	'2013_20_12_s1cbibsr',
	'2004_03_27_eafklbw5',
	'2004_03_27_448gk28n',
	'2004_03_27_scj70nfs',
	'2004_03_27_au8tvh9l',
	'2014_24_10_ixlibfss',
	'2013_21_04_kdhldjqc',
	'2013_12_11_xcenec2f',
	'2013_16_10_8rgzpul9',
	'2011_01_09_ksqe2eew',
	'2011_01_09_onmz0n3b',
//	'2013_12_11_5vebve74',
	'2014_02_10_6k4ky2so',
//	'2012_22_07_hxcy69zy',
	'2013_10_07_xe49m6p4',
	'2014_26_09_qkpl4qot',
//	'2021_25_12_e5uldihn',
	'2021_25_12_20ay646m',
	'2021_25_12_gt4zm97y',
	'2009_17_03_bz2cn5ji',

	// Other
	'2013_21_04_vxycfram',
	'2013_14_03_ym6qrqoq',
	'2013_13_03_yqml8m41',
	'2013_29_07_vkunjfah',
	'2014_17_09_ugggqgom',
	'2011_28_10_u2wyzaiu',
	'2009_06_04_uycaxao0',
	'2011_17_11_dzzav02o',
	'2013_27_06_52vzwyzs',
	'2013_21_06_qqp3d62b',
//	'2013_21_06_9tl9odry',
	'2019_01_08_gez313wb',
	'2015_08_05_y8tadkns',
	'2019_08_08_c0ih01xw',
	'2013_25_07_ibl8q3jv',
	'2013_27_09_hy6o0yqe',
	'2013_05_07_eucyybs0',
	'2021_21_09_znwy6f88',
//	'2021_21_09_fi1g0ewr',
//	'2019_08_08_7b80lu3n',
//	'2013_25_07_3e502auf',
//	'2013_25_04_mbzpsm9z',
//	'2013_21_11_7cwq2sg2',
//	'2013_20_12_jpgt75jo',
//	'2013_18_11_1l75okc1',
	'2019_10_08_d656285o',

	// Construction
	'2013_19_11_2jrw0kee',
//	'2013_19_11_0vo275q3',
	'2013_19_11_x0sn4qza',

	// Railing
	'2013_16_04_ypbxgugv',
	'2015_01_07_gpvitnea',
	'2014_26_09_j2l9dn52',
//	'2012_15_11_c667io96',
//	'2012_15_11_b9d8awpp',
	'2013_21_04_31zewo0n',
	'2021_20_08_7nmikbtz',
	'2021_25_12_kntgd39s',
	'2020_09_11_7qdovrzn',
	'2020_09_11_rqmammu0',
//	'2020_09_11_urwpjbun',
//	'2021_29_07_i3n27c7k',
	'2013_21_04_zts9sshj',
	'2021_25_12_vomncaa2',
//	'2021_09_06_krqmf6px',
//	'2013_20_12_xv2wmefh',
//	'2013_16_04_plzqmgg6',
//	'2013_16_04_5ooleegn',

	// Gate
	'2018_03_04_9q0ugvek',
	'2021_25_12_pyu6fol9',
//	'2013_14_01_1sqsnq6o',

	// Ladder
//	'2013_21_04_9ks5maoh',
	'2013_20_12_xw9ny20t',
	'2013_20_12_52tkf96f',
	'2020_22_10_12lpg8x2',
//	'2020_02_11_6cx4yarl',

	// Fence
	'2013_12_11_a7n969em',
	'2013_31_01_asqqa42v',
//	'2013_15_01_8wgfjt9o',
//	'2012_21_11_neh0s20c',
	'2012_23_11_wwols49t',
	'2013_20_12_xwwbl507',
	'2012_15_11_9y2exvl4',
//	'2013_14_01_n8079swt',
//	'2012_08_11_qs51useg',
//	'2012_12_11_wgr17x8n',
//	'2012_08_11_f36xuz6p',
	'2013_28_10_zh7z0fow',
	'2013_05_02_2qo2molh',
	'2013_05_02_ovumr7lb',
	'2021_09_06_om0taqp8',
];

const INDEX_HTML    = path.join (__dirname, 'index.html');
const INDEX_HBS     = path.join (__dirname, 'index.hbs' );
const INDEX_CONTENT = fs.readFileSync (INDEX_HBS, { encoding:'utf8' });
const INDEX_TMPL    = handlebars.compile (INDEX_CONTENT);

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
		photos: PHOTO_NAMES
	})
);
