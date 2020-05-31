{
	"translatorID": "352359a9-9104-4fb8-864f-ac7a1f117f3c",
	"label": "Australian Institute of Health and Welfare",
	"creator": "Joyce Chia",
	"target": "https?://(www).aihw.gov.au/reports/",
	"minVersion": "3.0.4",
	"maxVersion": "",
	"priority": 320,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-05-31 12:24:13"
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
	// TODO: adjust the logic here
	if (getSearchResults(doc, true)) {
		return "multiple";
	}
	else {
	return "report";
}}

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
		var pdf = ZU.xpath(doc, '//div[@class="s-report-download-addon"]/a[@id="p_lt_ctl30_RenderBody_p_lt_ctl03_DownloadReportButton_downloadReportLink" and @href]')[0];
		if (pdf) {//')[0];//*
			item.attachments.push({
				title: "Full Text PDF",
				url: pdf.href,
				mimeType: 'application/pdf'
			});
		}
		item.title = text(doc, 'h1');
		item.publisher = "Australian Institute of Health and Welfare";
		item.date = text(doc, 'time');
		item.complete();
	});

	translator.getTranslatorObject(function (trans) {
		trans.itemType = "report";
		trans.addCustomFields({
			'twitter:description': 'abstractNote'
		});
		trans.doWeb(doc, url);
	});
}
/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.ajol.info/index.php/thrb/article/view/63347",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Knowledge, treatment seeking and preventive practices in respect of malaria among patients with HIV at the Lagos University Teaching Hospital",
				"creators": [
					{
						"firstName": "Akinwumi A.",
						"lastName": "Akinyede",
						"creatorType": "author"
					},
					{
						"firstName": "Alade",
						"lastName": "Akintonwa",
						"creatorType": "author"
					},
					{
						"firstName": "Charles",
						"lastName": "Okany",
						"creatorType": "author"
					},
					{
						"firstName": "Olufunsho",
						"lastName": "Awodele",
						"creatorType": "author"
					},
					{
						"firstName": "Duro C.",
						"lastName": "Dolapo",
						"creatorType": "author"
					},
					{
						"firstName": "Adebimpe",
						"lastName": "Adeyinka",
						"creatorType": "author"
					},
					{
						"firstName": "Ademola",
						"lastName": "Yusuf",
						"creatorType": "author"
					}
				],
				"date": "2011-01-01",
				"DOI": "10.4314/thrb.v13i4.63347",
				"ISSN": "1821-9241",
				"abstractNote": "The synergistic interaction between Human Immunodeficiency virus (HIV) disease and Malaria makes it mandatory for patients with HIV to respond appropriately in preventing and treating malaria. Such response will help to control the two diseases. This study assessed the knowledge of 495 patients attending the HIV clinic, in Lagos University Teaching Hospital, Nigeria.&nbsp; Their treatment seeking, preventive practices with regards to malaria, as well as the impact of socio &ndash; demographic / socio - economic status were assessed. Out of these patients, 245 (49.5 %) used insecticide treated bed nets; this practice was not influenced by socio &ndash; demographic or socio &ndash; economic factors.&nbsp; However, knowledge of the cause, knowledge of prevention of malaria, appropriate use of antimalarial drugs and seeking treatment from the right source increased with increasing level of education (p &lt; 0.05). A greater proportion of the patients, 321 (64.9 %) utilized hospitals, pharmacy outlets or health centres when they perceived an attack of malaria. Educational intervention may result in these patients seeking treatment from the right place when an attack of malaria fever is perceived.",
				"issue": "4",
				"language": "en",
				"libraryCatalog": "www.ajol.info",
				"publicationTitle": "Tanzania Journal of Health Research",
				"rights": "Copyright for articles published in this journal is retained by the journal.",
				"url": "https://www.ajol.info/index.php/thrb/article/view/63347",
				"volume": "13",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://scholarworks.umass.edu/climate_nuclearpower/2011/nov19/34/",
		"items": [
			{
				"itemType": "conferencePaper",
				"title": "Session F: Contributed Oral Papers – F2: Energy, Climate, Nuclear Medicine: Reducing Energy Consumption and CO2 One Street Lamp at a Time",
				"creators": [
					{
						"firstName": "Peter",
						"lastName": "Somssich",
						"creatorType": "author"
					}
				],
				"date": "2011",
				"abstractNote": "Why wait for federal action on incentives to reduce energy use and address Greenhouse Gas (GHG) reductions (e.g. CO2), when we can take personal actions right now in our private lives and in our communities? One such initiative by private citizens working with Portsmouth NH officials resulted in the installation of energy reducing lighting products on Court St. and the benefits to taxpayers are still coming after over 4 years of operation. This citizen initiative to save money and reduce CO2 emissions, while only one small effort, could easily be duplicated in many towns and cities. Replacing old lamps in just one street fixture with a more energy efficient (Non-LED) lamp has resulted after 4 years of operation ($\\sim $15,000 hr. life of product) in real electrical energy savings of $>$ {\\$}43. and CO2 emission reduction of $>$ 465 lbs. The return on investment (ROI) was less than 2 years. This is much better than any financial investment available today and far safer. Our street only had 30 such lamps installed; however, the rest of Portsmouth (population 22,000) has at least another 150 street lamp fixtures that are candidates for such an upgrade. The talk will also address other energy reduction measures that green the planet and also put more green in the pockets of citizens and municipalities.",
				"conferenceName": "Climate Change and the Future of Nuclear Power",
				"language": "en",
				"libraryCatalog": "scholarworks.umass.edu",
				"shortTitle": "Session F",
				"url": "https://scholarworks.umass.edu/climate_nuclearpower/2011/nov19/34",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://scholarworks.umass.edu/lov/vol2/iss1/2/",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Wabanaki Resistance and Healing: An Exploration of the Contemporary Role of an Eighteenth Century Bounty Proclamation in an Indigenous Decolonization Process",
				"creators": [
					{
						"firstName": "Bonnie D.",
						"lastName": "Newsom",
						"creatorType": "author"
					},
					{
						"firstName": "Jamie",
						"lastName": "Bissonette-Lewey",
						"creatorType": "author"
					}
				],
				"date": "2012",
				"DOI": "10.7275/R5KW5CXB",
				"ISSN": "1947-508X",
				"abstractNote": "The purpose of this paper is to examine the contemporary role of an eighteenth century bounty proclamation issued on the Penobscot Indians of Maine. We focus specifically on how the changing cultural context of the 1755 Spencer Phips Bounty Proclamation has transformed the document from serving as a tool for sanctioned violence to a tool of decolonization for the Indigenous peoples of Maine. We explore examples of the ways indigenous and non-indigenous people use the Phips Proclamation to illustrate past violence directed against Indigenous peoples. This exploration is enhanced with an analysis of the re-introduction of the Phips Proclamation using concepts of decolonization theory.",
				"issue": "1",
				"language": "en",
				"libraryCatalog": "scholarworks.umass.edu",
				"pages": "2",
				"publicationTitle": "Landscapes of Violence",
				"shortTitle": "Wabanaki Resistance and Healing",
				"url": "https://scholarworks.umass.edu/lov/vol2/iss1/2",
				"volume": "2",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://scholarworks.umass.edu/open_access_dissertations/508/",
		"items": [
			{
				"itemType": "thesis",
				"title": "Decision-Theoretic Meta-reasoning in Partially Observable and Decentralized Settings",
				"creators": [
					{
						"firstName": "Alan Scott",
						"lastName": "Carlin",
						"creatorType": "author"
					}
				],
				"date": "2012",
				"abstractNote": "This thesis examines decentralized meta-reasoning. For a single agent or multiple agents, it may not be enough for agents to compute correct decisions if they do not do so in a timely or resource efficient fashion. The utility of agent decisions typically increases with decision quality, but decreases with computation time. The reasoning about one's computation process is referred to as meta-reasoning. Aspects of meta-reasoning considered in this thesis include the reasoning about how to allocate computational resources, including when to stop one type of computation and begin another, and when to stop all computation and report an answer. Given a computational model, this translates into computing how to schedule the basic computations that solve a problem. This thesis constructs meta-reasoning strategies for the purposes of monitoring and control in multi-agent settings, specifically settings that can be modeled by the Decentralized Partially Observable Markov Decision Process (Dec-POMDP). It uses decision theory to optimize computation for efficiency in time and space in communicative and non-communicative decentralized settings. Whereas base-level reasoning describes the optimization of actual agent behaviors, the meta-reasoning strategies produced by this thesis dynamically optimize the computational resources which lead to the selection of base-level behaviors.",
				"extra": "DOI: https://doi.org/10.7275/n8e9-xy93",
				"language": "en",
				"libraryCatalog": "scholarworks.umass.edu",
				"university": "University of Massachusetts Amherst",
				"url": "https://scholarworks.umass.edu/open_access_dissertations/508",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://scielosp.org/scielo.php?script=sci_abstract&pid=S0034-89102007000900015&lng=en&nrm=iso&tlng=en",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Impressões sobre o teste rápido para o HIV entre usuários de drogas injetáveis no Brasil",
				"creators": [
					{
						"firstName": "P. R.",
						"lastName": "Telles-Dias",
						"creatorType": "author"
					},
					{
						"firstName": "S.",
						"lastName": "Westman",
						"creatorType": "author"
					},
					{
						"firstName": "A. E.",
						"lastName": "Fernandez",
						"creatorType": "author"
					},
					{
						"firstName": "M.",
						"lastName": "Sanchez",
						"creatorType": "author"
					}
				],
				"date": "2007-12",
				"DOI": "10.1590/S0034-89102007000900015",
				"ISSN": "0034-8910, 0034-8910, 1518-8787",
				"abstractNote": "OBJETIVO: Descrever as impressões, experiências, conhecimentos, crenças e a receptividade de usuários de drogas injetáveis para participar das estratégias de testagem rápida para HIV. MÉTODOS: Estudo qualitativo exploratório foi conduzido entre usuários de drogas injetáveis, de dezembro de 2003 a fevereiro de 2004, em cinco cidades brasileiras, localizadas em quatro regiões do País. Um roteiro de entrevista semi-estruturado contendo questões fechadas e abertas foi usado para avaliar percepções desses usuários sobre procedimentos e formas alternativas de acesso e testagem. Foram realizadas 106 entrevistas, aproximadamente 26 por região. RESULTADOS: Características da população estudada, opiniões sobre o teste rápido e preferências por usar amostras de sangue ou saliva foram apresentadas junto com as vantagens e desvantagens associadas a cada opção. Os resultados mostraram a viabilidade do uso de testes rápidos entre usuários de drogas injetáveis e o interesse deles quanto à utilização destes métodos, especialmente se puderem ser equacionadas questões relacionadas à confidencialidade e confiabilidade dos testes. CONCLUSÕES: Os resultados indicam que os testes rápidos para HIV seriam bem recebidos por essa população. Esses testes podem ser considerados uma ferramenta valiosa, ao permitir que mais usuários de drogas injetáveis conheçam sua sorologia para o HIV e possam ser referidos para tratamento, como subsidiar a melhoria das estratégias de testagem entre usuários de drogas injetáveis.",
				"journalAbbreviation": "Rev. Saúde Pública",
				"language": "pt",
				"libraryCatalog": "scielosp.org",
				"pages": "94-100",
				"publicationTitle": "Revista de Saúde Pública",
				"url": "https://scielosp.org/scielo.php?script=sci_abstract&pid=S0034-89102007000900015&lng=en&nrm=iso&tlng=en",
				"volume": "41",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.hindawi.com/journals/mpe/2013/868174/abs/",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Robust Filtering for Networked Stochastic Systems Subject to Sensor Nonlinearity",
				"creators": [
					{
						"firstName": "Guoqiang",
						"lastName": "Wu",
						"creatorType": "author"
					},
					{
						"firstName": "Jianwei",
						"lastName": "Zhang",
						"creatorType": "author"
					},
					{
						"firstName": "Yuguang",
						"lastName": "Bai",
						"creatorType": "author"
					}
				],
				"date": "2013/02/20",
				"DOI": "10.1155/2013/868174",
				"ISSN": "1024-123X",
				"abstractNote": "The problem of network-based robust filtering for stochastic systems with sensor nonlinearity is investigated in this paper. In the network environment, the effects of the sensor saturation, output quantization, and network-induced delay are taken into simultaneous consideration, and the output measurements received in the filter side are incomplete. The random delays are modeled as a linear function of the stochastic variable described by a Bernoulli random binary distribution. The derived criteria for performance analysis of the filtering-error system and filter design are proposed which can be solved by using convex optimization method. Numerical examples show the effectiveness of the design method.",
				"language": "en",
				"libraryCatalog": "www.hindawi.com",
				"publicationTitle": "Mathematical Problems in Engineering",
				"url": "https://www.hindawi.com/journals/mpe/2013/868174/abs/",
				"volume": "2013",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://volokh.com/2013/12/22/northwestern-cant-quit-asa-boycott-member/",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Northwestern Can't Quit ASA Over Boycott Because it is Not a Member",
				"creators": [
					{
						"firstName": "Eugene",
						"lastName": "Kontorovich",
						"creatorType": "author"
					}
				],
				"date": "2013-12-22T11:58:34+00:00",
				"abstractNote": "Northwestern University recently condemned the American Studies Association boycott of Israel. Unlike some other schools that quit their institutional membership in the ASA over the boycott, Northwestern has not. Many of my Northwestern colleagues were about to start urging a similar withdrawal.\nThen we learned from our administration that despite being listed as in institutional member by the ASA,  the university has, after checking, concluded it has no such membership, does not plan to get one, and is unclear why the ASA would list us as institutional member.\nApparently, at least several other schools listed by the ASA as institutional members say they have no such relationship.\nThe ASA has been spending a great deal of energy on political activism far from its mission, but apparently cannot keep its books in order. The association has yet to explain how it has come to list as institutional members so many schools that know nothing about such a membership. The ASA’s membership rolls may get much shorter in the coming weeks even without any quitting.\nHow this confusion came to arise is unclear. ASA membership, like that of many academic organizations, comes with a subscription to their journal. Some have suggested that perhaps  the ASA also counts as members any institution whose library happened to subscribe to the journal, ie tacking on membership to a subscription, rather than vice versa. This would not be fair on their part. A library may subscribe to all sorts of journals for academic research purposes (ie Pravda), without endorsing the organization that publishes it. That is the difference between subscription and membership.\nI eagerly await the ASA’s explanation of the situation. [...]",
				"blogTitle": "The Volokh Conspiracy",
				"language": "en-US",
				"url": "http://volokh.com/2013/12/22/northwestern-cant-quit-asa-boycott-member/",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://hbr.org/2015/08/how-to-do-walking-meetings-right",
		"items": [
			{
				"itemType": "webpage",
				"title": "How to Do Walking Meetings Right",
				"creators": [
					{
						"firstName": "Russell",
						"lastName": "Clayton",
						"creatorType": "author"
					},
					{
						"firstName": "Christopher",
						"lastName": "Thomas",
						"creatorType": "author"
					},
					{
						"firstName": "Jack",
						"lastName": "Smothers",
						"creatorType": "author"
					}
				],
				"date": "2015-08-05T12:05:17Z",
				"abstractNote": "New research finds creativity benefits.",
				"url": "https://hbr.org/2015/08/how-to-do-walking-meetings-right",
				"websiteTitle": "Harvard Business Review",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://olh.openlibhums.org/article/10.16995/olh.46/",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Opening the Open Library of Humanities",
				"creators": [
					{
						"firstName": "Martin",
						"lastName": "Eve",
						"creatorType": "author"
					},
					{
						"firstName": "Caroline",
						"lastName": "Edwards",
						"creatorType": "author"
					}
				],
				"date": "2015-09-28",
				"DOI": "10.16995/olh.46",
				"ISSN": "2056-6700",
				"abstractNote": "Article: Opening the Open Library of Humanities",
				"issue": "1",
				"language": "en",
				"libraryCatalog": "olh.openlibhums.org",
				"pages": "e1",
				"publicationTitle": "Open Library of Humanities",
				"rights": "Authors who publish with this journal agree to the following terms:    Authors retain copyright and grant the journal right of first publication with the work simultaneously licensed under a  Creative Commons Attribution License  that allows others to share the work with an acknowledgement of the work's authorship and initial publication in this journal.  Authors are able to enter into separate, additional contractual arrangements for the non-exclusive distribution of the journal's published version of the work (e.g., post it to an institutional repository or publish it in a book), with an acknowledgement of its initial publication in this journal.  Authors are permitted and encouraged to post their work online (e.g., in institutional repositories or on their website) prior to and during the submission process, as it can lead to productive exchanges, as well as earlier and greater citation of published work (See  The Effect of Open Access ).  All third-party images reproduced on this journal are shared under Educational Fair Use. For more information on  Educational Fair Use , please see  this useful checklist prepared by Columbia University Libraries .   All copyright  of third-party content posted here for research purposes belongs to its original owners.  Unless otherwise stated all references to characters and comic art presented on this journal are ©, ® or ™ of their respective owners. No challenge to any owner’s rights is intended or should be inferred.",
				"url": "http://olh.openlibhums.org/article/10.16995/olh.46/",
				"volume": "1",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.vox.com/2016/1/7/10726296/wheres-rey-star-wars-monopoly",
		"items": [
			{
				"itemType": "webpage",
				"title": "#WheresRey and the big Star Wars toy controversy, explained",
				"creators": [
					{
						"firstName": "Caroline",
						"lastName": "Framke",
						"creatorType": "author"
					}
				],
				"date": "2016-01-07T08:20:02-05:00",
				"abstractNote": "Excluding female characters in merchandise is an ongoing pattern.",
				"url": "https://www.vox.com/2016/1/7/10726296/wheres-rey-star-wars-monopoly",
				"websiteTitle": "Vox",
				"attachments": [
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.diva-portal.org/smash/record.jsf?pid=diva2%3A766397&dswid=510",
		"items": [
			{
				"itemType": "conferencePaper",
				"title": "Mobility modeling for transport efficiency : Analysis of travel characteristics based on mobile phone data",
				"creators": [
					{
						"firstName": "Vangelis",
						"lastName": "Angelakis",
						"creatorType": "author"
					},
					{
						"firstName": "David",
						"lastName": "Gundlegård",
						"creatorType": "author"
					},
					{
						"firstName": "Clas",
						"lastName": "Rydergren",
						"creatorType": "author"
					},
					{
						"firstName": "Botond",
						"lastName": "Rajna",
						"creatorType": "author"
					},
					{
						"firstName": "Katerina",
						"lastName": "Vrotsou",
						"creatorType": "author"
					},
					{
						"firstName": "Richard",
						"lastName": "Carlsson",
						"creatorType": "author"
					},
					{
						"firstName": "Julien",
						"lastName": "Forgeat",
						"creatorType": "author"
					},
					{
						"firstName": "Tracy H.",
						"lastName": "Hu",
						"creatorType": "author"
					},
					{
						"firstName": "Evan L.",
						"lastName": "Liu",
						"creatorType": "author"
					},
					{
						"firstName": "Simon",
						"lastName": "Moritz",
						"creatorType": "author"
					},
					{
						"firstName": "Sky",
						"lastName": "Zhao",
						"creatorType": "author"
					},
					{
						"firstName": "Yaotian",
						"lastName": "Zheng",
						"creatorType": "author"
					}
				],
				"date": "2013",
				"abstractNote": "DiVA portal is a finding tool for research publications and student theses written at the following 47 universities and research institutions.",
				"conferenceName": "Netmob 2013 - Third International Conference on the Analysis of Mobile Phone Datasets, May 1-3, 2013, MIT, Cambridge, MA, USA",
				"language": "eng",
				"libraryCatalog": "www.diva-portal.org",
				"shortTitle": "Mobility modeling for transport efficiency",
				"url": "http://urn.kb.se/resolve?urn=urn:nbn:se:liu:diva-112443",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://link.springer.com/article/10.1023/A:1021669308832",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Why Bohm's Quantum Theory?",
				"creators": [
					{
						"firstName": "H. D.",
						"lastName": "Zeh",
						"creatorType": "author"
					}
				],
				"date": "1999/04/01",
				"DOI": "10.1023/A:1021669308832",
				"ISSN": "0894-9875, 1572-9524",
				"abstractNote": "This is a brief reply to S. Goldstein's article “Quantum theory without observers” in Physics Today.It is pointed out that Bohm's pilot wave theory is successful only because it keeps Schrödinger's...",
				"issue": "2",
				"journalAbbreviation": "Found Phys Lett",
				"language": "en",
				"libraryCatalog": "link.springer.com",
				"pages": "197-200",
				"publicationTitle": "Foundations of Physics Letters",
				"url": "https://link.springer.com/article/10.1023/A:1021669308832",
				"volume": "12",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://muse.jhu.edu/article/234097",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Serfs on the Move: Peasant Seasonal Migration in Pre-Reform Russia, 1800–61",
				"creators": [
					{
						"firstName": "Boris B.",
						"lastName": "Gorshkov",
						"creatorType": "author"
					}
				],
				"date": "2000",
				"DOI": "10.1353/kri.2008.0061",
				"ISSN": "1538-5000",
				"issue": "4",
				"language": "en",
				"libraryCatalog": "muse.jhu.edu",
				"pages": "627-656",
				"publicationTitle": "Kritika: Explorations in Russian and Eurasian History",
				"shortTitle": "Serfs on the Move",
				"url": "https://muse.jhu.edu/article/234097",
				"volume": "1",
				"attachments": [
					{
						"title": "Full Text PDF",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
