'use strict';

var forEach = require('lodash/collection/forEach'),
    glob = require('glob');

function isExercise(page) {
  return page.layout === 'exercise_en' || page.layout === 'exercise_de';
}

function getExerciseName(page) {
  var name = page.name;

  name = name.substring(name.lastIndexOf('/') + 1);

  return name.replace(/\..*/, '');
}

module.exports = function(druck) {

  druck.init({
    source: 'pages',
    dest: 'dist',
    templates: 'templates'
  });

  var languages = {
    en: {
      exercises: 'English/:name/01-Exercise',
      results: 'English/:name/02-Results',
      solution: 'English/:name/03-Solution'
    },
    de: {
      exercises: 'German/:name/01-Aufgabenstellung',
      results: 'German/:name/02-Ergebnisse',
      solution: 'German/:name/03-Musterlösung'
    }
  };


  var basePath = 'https://raw.githubusercontent.com/camunda/bpmn-for-research/master/';

  function generateLanguage(structure, lang) {

    var exercisePages = druck.files(lang + '/*/*.md');

    forEach(exercisePages, function(p) {

      if (isExercise(p)) {

        var name = p.shortName = getExerciseName(p);

        console.log(name);

        var resultsDir = languages[lang].results.replace(/\:name/, name),
            solutionDir = languages[lang].solution.replace(/\:name/, name);

        var resultsBase = 'BPMN for Research/' + resultsDir + '/',
            solutionBase = 'BPMN for Research/' + solutionDir + '/';

        var resultFiles = glob.sync(resultsBase + '*.bpmn', { cwd: '..' });

        var results = {
          base: basePath + resultsBase,
          files: resultFiles.map(function(f) { return f.substring(resultsBase.length); })
        };

        var solutionFiles = glob.sync(solutionBase + '*.bpmn', { cwd: '..' });

        var solutions = {
          base: basePath + solutionBase,
          files: solutionFiles.map(function(f) { return f.substring(solutionBase.length); })
        };

        p.diagrams = JSON.stringify({
          results: results,
          solutions: solutions
        });
      }
    });


    // execises

    druck.generate({
      source: exercisePages,
      dest: ':name/index.html'
    });

    // other pages

    druck.generate({
      source: lang + '/index.md',
      dest: ':name.html',
      locals: {
        exercises: exercisePages
      }
    });
  }

  // generate en/de language files
  forEach(languages, generateLanguage);

  // index.html

  druck.generate({
    source: 'index.html',
    dest: 'index.html'
  });

};