
import './Leiden.css';

function convertToLeiden(xmlString, isDiplomatic) {

    // add enclosing element because sometimes there are multiple edition divs without an enclosing parent
    var teiDomFragment = $( $.parseXML( `<span>${xmlString}</span>` ) );
      
    let editionElement = teiDomFragment.find('div[n][type="edition"]')
    if (editionElement) {
      editionElement.each(function(index){
        $( this ).prepend(`<div style="font-weight:bold">${index?'<br/><br/>':''}Edition: ${editionElement.attr('n')}</div>`)
      })
    }

    teiDomFragment.find('placeName').attr( 'ng-click', 
      function() { return 'openPlaceWindow("' + $(this).attr('key') + '")';}).wrap('<a></a>');
    teiDomFragment.find('persName name').attr( 'ng-click', 
      function() { return 'openPlaceWindow("' + $(this).attr('nymRef') + '")';}).wrap('<a></a>');
    teiDomFragment.find('bibl').attr( 'ng-click', 
      function() { return 'openPlaceWindow("' + $(this).attr('n') + '")';}).wrap('<a></a>');

      // popup the lemma if there.
    teiDomFragment.find('w').attr('popover-trigger', 'mouseenter').attr('popover', 
    function() { return 'Lemma: ' + $(this).attr('lemma');});

    if (isDiplomatic) {
      teiDomFragment.remove('supplied');
      teiDomFragment.remove('unclear');
      teiDomFragment.remove('gap');
        } else {

          var leidenRules = {
            gap: {
              lost:   function(element) { }, 
              illegible: null
            }, 
            unclear: {}
          }
      teiDomFragment.find('supplied').before('[').after(']');
      //  before($('<span class='leiden_supplied_start'>').
      //  text('[')).after($('<span class='leiden_supplied_end'>').
      //  text(']'));

      // put a dot under each character within the unclear element
      teiDomFragment.find('unclear').each(
        function() {
          var unclearElement = $(this);
          unclearElement.text(
            unclearElement.text().split('').map(function(character) { return character + '\u0323'}).join().trim()
          );
        });

      teiDomFragment.find('hi').each(
        function() {
          var hiElement = $(this);
          var rend = hiElement.attr('rend');
          if (rend == 'ligature') {
            var oldText = hiElement.text();
            hiElement.text(oldText.charAt(0) + '\u0302' + oldText.substring(1));
          }
        }
      )

      teiDomFragment.find('ex').before('(').after(')');

      teiDomFragment.find('gap').each(
        function() {
          var elementText;
          var gapElement = $(this);
          var reason = gapElement.attr('reason');
          var extent = gapElement.attr('extent');
          var unit = gapElement.attr('unit');
          if (reason == 'lost') {
            elementText = '[';
            if (extent == 'unknown') {
              elementText += '---';
            } else {
              elementText += _.repeat('.', extent);
            }
            elementText += ']';
          } else if (reason == 'illegible') {
            elementText = _.repeat('+', extent);
          }
          gapElement.text(elementText);
        }
      )

      teiDomFragment.find('g[ref="interpunct"]').text('·');

      teiDomFragment.find('space').each(
        function() {
          var spaceElement = $(this);
          var extent = spaceElement.attr('extent');
          spaceElement.text('(vac.' + extent + ')');
        })
    }


  teiDomFragment.find('note').attr('popover-trigger', 'mouseenter').attr('popover', 
    function() { return 'Note: ' + $(this).text();}).wrap( '<a></a>' ).text('');

  return teiDomFragment

}


<epidoc-transcription class="epidoc-transcription" edition="inscriptionVM.inscription.getEdition()" style="margin:1em;overflow: scroll;  width:95%; font-size:13px; padding-left:30px; "></epidoc-transcription>
     