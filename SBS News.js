{
	"translatorID": "752cfcaa-a686-4742-ad3a-209e8673af89",
	"label": "SBS News ",
	"creator": "Joyce Chia",
	"target": "https?://(www.)?sbs.com.au/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-05-31 07:20:53"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2020 Joyce Chia
	
	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


function detectWeb(doc, url) {
	//Homepage needs translation, can match only by className for div but also outputs rubbish
	if (url.match('topic') || (url.match('latest')) 
	        && getSearchResults(doc, true)) {
		return 'multiple';
	}
	else {
		return 'newspaperArticle';
	}
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO: adjust the CSS selector
	var rows = doc.querySelectorAll('p.headline.preview__headline a');
	Zotero.debug(rows);
	for (let row of rows) {
		// TODO: check and maybe adjust
		let href = row.href;
		// TODO: check and maybe adjust
		let title = row.textContent;
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		Zotero.selectItems(getSearchResults(doc, false), function (items) {
			if (items) ZU.processDocuments(Object.keys(items), scrape);
		});
	}
	else {
		scrape(doc, url);
	}
}
function scrape(doc, url) {
	var translator = Zotero.loadTranslator('web');
	// Embedded Metadata
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');
	// translator.setDocument(doc);
	
	translator.setHandler('itemDone', function (obj, item) {
		item.section = "News";
		item.publicationDate = ZU.xpathText(doc, '//meta[@itemprop="datePublished"]/@content');
		//not possible to pinpoint other class names, clean up metadata instead
		var authorByline = text(doc, '*[class^="article__meta__byline"]').split("By");
		var authors = authorByline[1];
		if (authors && item.creators.length <= 1) {
			authors = authors.replace(/^By /, '');
			if (authors == authors.toUpperCase()) { // convert to title case if all caps
				authors = ZU.capitalizeTitle(authors, true);
			}
			item.creators = [];
			var authorsList = authors.split(/,|\band\b/);
			for (let i = 0; i < authorsList.length; i++) {
				item.creators.push(ZU.cleanAuthor(authorsList[i], "author"));
			}}
		item.complete();
	});

		translator.getTranslatorObject(function (trans) {
		trans.itemType = "newspaperArticle";
		// TODO map additional meta tags here, or delete completely
		trans.addCustomFields({
			'twitter:description': 'abstractNote'
		});
		trans.doWeb(doc, url);
	});
}
