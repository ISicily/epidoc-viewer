const ISic000002 = `<?xml-model href="http://www.stoa.org/epidoc/schema/latest/tei-epidoc.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?><?xml-model href="../schematron/ircyr-checking.sch" schematypens="http://purl.oclc.org/dsdl/schematron"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0" xml:lang="en">
    <teiHeader>
        <fileDesc>
            <titleStmt>
                <title>Epitaph for Lurius Zosimus</title>
                <editor ref="#JP">Jonathan Prag</editor>
                <principal ref="#JP">Jonathan Prag</principal>
                <funder>John Fell OUP Research Fund</funder>
                <funder>
                    <ref target="https://cordis.europa.eu/project/id/885040">ERC Advanced Grant no.885040</ref>
                </funder>
                <respStmt>
                    <name xml:id="JP" ref="http://orcid.org/0000-0003-3819-8537">Jonathan Prag</name>
                    <resp>original data collection and editing</resp>
                </respStmt>
                <respStmt>
                    <name xml:id="JCu" ref="http://orcid.org/0000-0002-6686-3728">James Cummings</name>
                    <resp>conversion to EpiDoc</resp>
                </respStmt>
                <respStmt>
                    <name xml:id="JCh" ref="http://orcid.org/0000-0001-6823-0265">James Chartrand</name>
                    <resp>site construction and encoding</resp>
                </respStmt>
                <respStmt>
                    <name xml:id="VV" ref="http://orcid.org/0000-0002-9695-0240">Valeria Vitale</name>
                    <resp>editing of geo data</resp>
                </respStmt>
                <respStmt>
                    <name xml:id="MM">Michael Metcalfe</name>
                    <resp>museum data collection</resp>
                </respStmt>
                <respStmt>
                    <name xml:id="SS" ref="https://orcid.org/0000-0003-3914-9569">Simona Stoyanova</name>
                    <resp>standardisation of template and tidying up encoding</resp>
                </respStmt>
                <respStmt>
                    <name xml:id="system">system</name>
                    <resp>automated or batch processes</resp>
                </respStmt>
            </titleStmt>
            <publicationStmt>
                <authority>I.Sicily</authority>
                <idno type="filename">ISic000002</idno>
                <idno type="TM">491568</idno>
                <idno type="EDR">141180</idno>
                <idno type="EDH"/>
                <idno type="EDCS">21900397</idno>
                <idno type="PHI"/>
                <idno type="URI">http://sicily.classics.ox.ac.uk/inscription/ISic000002</idno>
                <idno type="DOI" when="2020-12-17">10.5281/zenodo.4333725</idno>
                <availability>
                    <licence target="http://creativecommons.org/licenses/by/4.0/">Licensed under a Creative
                        Commons-Attribution 4.0 licence.
                    </licence>
                </availability>
            </publicationStmt>
            <sourceDesc>
                <msDesc>
                    <msIdentifier>
                        <country>Italy</country>
                        <region>Sicily</region>
                        <settlement>Palermo</settlement>
                        <repository role="museum" ref="http://sicily.classics.ox.ac.uk/museum/064">Museo Archeologico Regionale Antonino Salinas</repository>
                        <idno type="inventory">3502</idno>
                        <altIdentifier>
                            <settlement/>
                            <repository/>
                            <idno type="old"/>
                        </altIdentifier>
                    </msIdentifier>
                    <msContents>
                        <textLang mainLang="la">Latin</textLang>
                    </msContents>
                    <physDesc>
                        <objectDesc>
                            <supportDesc>
                                <support>
                                    <material key="marble" ref="http://www.eagle-network.eu/voc/material/lod/48.html">marble</material>
                                    <objectType/>
                                    <dimensions>
                                        <height unit="cm"/>
                                        <width unit="cm"/>
                                        <depth unit="cm"/>
                                    </dimensions>
                                </support>
                                <condition/>
                            </supportDesc>
                            <layoutDesc>
                                <layout>
                                    <rs type="execution" ref="http://www.eagle-network.eu/voc/writing/lod/1">Engraved</rs>
                                </layout>
                            </layoutDesc>
                        </objectDesc>
                        <handDesc>
                            <handNote><!--Default value and requires editing-->
                                <locus from="line1" to="line1">Line 1</locus>
                                <dimensions type="letterHeight">
                                    <height unit="mm"/>
                                </dimensions>
                                <locus from="line1" to="line2">Interlineation line 1 to 2</locus>
                                <dimensions type="interlinear">
                                    <height unit="mm"/>
                                </dimensions>
                            </handNote>
                        </handDesc>
                    </physDesc>
                    <history>
                        <origin>
                            <origPlace>
                                <placeName type="ancient" ref="http://pleiades.stoa.org/places/462270">Catina</placeName>
                                <placeName type="modern" ref="http://sws.geonames.org/2525068">Catania</placeName>
                                <geo>37.49223, 15.07041</geo>
                            </origPlace>
                            <origDate datingMethod="#julian" notBefore-custom="0200" notAfter-custom="0300">C3 AD ?</origDate>
                        </origin>
                        <provenance type="found"/>
                        <provenance type="observed" subtype="autopsied">No Autopsy</provenance>
                        <acquisition>Palermo, Museo Archeologico Regionale Antonino Salinas no. 3502</acquisition>
                    </history>
                </msDesc>
            </sourceDesc>
        </fileDesc>
        <profileDesc>
            <calendarDesc>
                <calendar xml:id="julian">
                    <p>Julian Calendar</p>
                </calendar>
            </calendarDesc>
            <langUsage>
                <language ident="en">English</language>
                <language ident="it">Italian</language>
                <language ident="grc">Ancient Greek</language>
                <language ident="la">Latin</language>
                <language ident="he">Hebrew</language>
                <language ident="phn">Phoenician</language>
                <language ident="xpu">Punic</language>
                <language ident="osc">Oscan</language>
                <language ident="xly">Elymian</language>
                <language ident="scx">Sikel</language>
                <language ident="sxc">Sikan</language>
            </langUsage>
            <textClass>
                <keywords scheme="http://www.eagle-network.eu/voc/typeins.html">
                    <term key="funerary" ref="http://www.eagle-network.eu/voc/typeins/lod/92.html">funerary</term>
                </keywords>
            </textClass>
        </profileDesc>
        <revisionDesc status="draft">
            <listChange>
                <change when="2016-12-03" who="#JCu">James Cummings autogenerated EpiDoc output from database</change>
                <change when="2017-07-31" who="#JP">Jonathan Prag checked the EpiDoc</change>
                <change when="2020-10-05" who="#SS">Simona Stoyanova normalised Unicode</change>
                <change when="2020-10-08" who="#SS">Simona Stoyanova updated list of languages</change>
                <change when="2020-10-30" who="#JP">Jonathan Prag test relocated geo in origPlace; tidied up epidoc</change>
                <change when="2020-11-20" who="#SS">Simona Stoyanova added EDCS numbers</change>
                <change when="2020-11-26" who="#SS">Simona Stoyanova restructured bibliography</change>
                <change when="2020-12-17" who="#system">Updated Zenodo DOI</change>
                <change when="2021-01-19" who="#SS">renumbered files, uris and references</change>
            </listChange>
        </revisionDesc>
    </teiHeader>
    <facsimile>
        <surface/>
        <!--delete empty surface above and uncomment template below if needed-->
        <!--
  <surface type="front">
    <graphic n="screen" url="{concat('ISic', $num, '_tiled.tif')}"
      height="4912px" width="7360px">
      <desc>Add Description Here</desc>
    </graphic>
    <graphic n="print" url="{concat('ISic', $num, '.jpg')}" height="3680px" width="5520px">
      <desc>Add Description Here</desc>
    </graphic>
  </surface>

    -->
    </facsimile>
    <text>
        <body>
            <div type="edition" xml:space="preserve" xml:lang="la" resp="#JP">
                <ab>
                    <lb n="1"/>
                    <expan>
                        <abbr>D</abbr>
                        <ex>is</ex>
                    </expan>
                    <g type="interpunct">·</g>
                    <expan>
                        <abbr>M</abbr>
                        <ex>anibus</ex>
                    </expan>
                    <g type="interpunct">·</g>
                    <expan>
                        <abbr>s</abbr>
                        <ex>acrum</ex>
                    </expan>
                    <lb n="2"/>
                    <persName>
                        <name>Lurius</name>
                        <g type="interpunct">·</g>
                        <name>Zosimus</name>
                    </persName>
                    <lb n="3"/>
                    <expan>
                        <abbr>vix</abbr>
                        <ex>it</ex>
                    </expan>
                    <g type="interpunct">·</g> annis <g type="interpunct">·</g>
                    <num value="7">VII</num>
                    <lb n="4"/>
                    <persName>
                        <name>Luria</name>
                        <g type="interpunct">·</g>
                        <name>
                            <expan>
                                <abbr>Melanth</abbr>
                                <ex>e</ex>
                            </expan>
                        </name>
                    </persName> i
                    <lb n="5" break="no"/>n <g type="interpunct">·</g> suo <g type="interpunct">·</g> filio <g type="interpunct">·</g> fecit
                </ab>
            </div>
            <div type="apparatus">
                <listApp>
                    <app loc="Line 4-5">
                        <note>Mommsen rejects the alternative reading of 'Melanthin(a) suo'</note>
                    </app>
                </listApp>
            </div>
            <div type="translation" xml:lang="en" resp="#JP">
                <p>Sacred to the shades of the underworld. Luris Zosimus lived for 7 years. Luria Melanthe made it for her son.</p>
            </div>
            <div type="commentary">
                <p><!--commentary--></p>
            </div>
            <div type="bibliography">
                <listBibl type="edition">
                    <bibl type="corpus" n="CIL">
                        <citedRange>
                            <ref target="http://arachne.uni-koeln.de/books/CILv10pII1883">10.7075</ref>
                        </citedRange>
                        <ptr target="https://www.zotero.org/groups/382445/items/GQN8UZSI"/>
                    </bibl>
                    <bibl type="corpus" n="ILMusPalermo">
                        <citedRange>2</citedRange>
                        <ptr target="https://www.zotero.org/groups/382445/items/FZWWPUD6"/>
                    </bibl>
                    <bibl/>
                </listBibl>
                <listBibl type="discussion">
                    <bibl/>
                </listBibl>
            </div>
        </body>
    </text>
</TEI>`

export default ISic000002