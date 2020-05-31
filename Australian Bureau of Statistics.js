{
	"translatorID": "40d25b9c-2c5d-4152-a797-c632d78245e3",
	"label": "Australian Bureau of Statistics",
	"creator": "Joyce Chia",
	"target": "https?://(www).abs.gov.au/ausstats/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-05-31 10:05:27"
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
/*This doesn't include a multi-scraper as website at present doesn't allow
and website is due to be replaced this year */
	if (url.includes('/aus/')) {
		return "report";
	}
	else if (getSearchResults(doc, true)) {
		return "multiple";
	}
	return false;
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO: adjust the CSS selector
	var rows = doc.querySelectorAll('h2>a.title[href*="/article/"]');
	for (let row of rows) {
		// TODO: check and maybe adjust
		let href = row.href;
		// TODO: check and maybe adjust
		let title = ZU.trimInternal(row.textContent);
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
		// TODO adjust if needed:
		var fullTitle = (doc.title).slice(8);
		var catalogNumber = (doc.title).slice(0, 6);
		item.title = fullTitle;
		//New ABS website will remove catalogue numbers, but these can be very useful
		item.reportNumber = catalogNumber;
		item.publisher = "Australian Bureau of Statistics";
		item.reportType = "Catalogue";
		item.creators = [];
		item.institution = "Australian Bureau of Statistics";
		item.company = "";
		item.label = "";
		item.distributor = "";
		item.abstractNote= "";
		item.complete();
	});

	translator.getTranslatorObject(function (trans) {
		trans.itemType = "report";
		// TODO map additional meta tags here, or delete completely
		trans.addCustomFields({
			'twitter:description': 'abstractNote'
		});
		trans.doWeb(doc, url);
	});
}
