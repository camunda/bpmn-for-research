/**
 * bpmn for research - JS snippets
 */

(function() {

  var BpmnViewer = window.BpmnJS;

  var diagrams = window.diagrams;


  function renderDiagrams(parent, files, base) {

    // create new viewe
    $.each(files, function(idx, f) {

      var canvas = $('<div class="diagram-canvas"></div>').appendTo(parent);

      var viewer = new BpmnViewer({ container: canvas });

      $.get(base + f, function(result) {

        viewer.importXML(result, function(err) {
          if (err) {
            console.error('diagram import error', err);
          } else {

            viewer.get('canvas').zoom('fit-viewport');
          }
        });
      });

    });
  }

  var solutionContainer = $('#solutions');

  renderDiagrams(solutionContainer, diagrams.solutions.files, diagrams.solutions.base);


  var resultsContainer = $('#results');

  function renderRandomResults() {

    // remove old children
    resultsContainer.empty();

    var button = $('<button>reload diagrams</button>').appendTo(resultsContainer).click(renderRandomResults);

    var allResults = diagrams.results.files;

    var selectedResults = [];

    while (selectedResults.length < 4) {
      var idx = Math.round(Math.random() * allResults.length);
      selectedResults.push(allResults[idx]);
    }

    renderDiagrams(resultsContainer, selectedResults, diagrams.results.base);
  }

  renderRandomResults();
})();