 (function() {

  const $input = $('#input')
  const $results = $('#results')
  const testdatakeys = Object.keys(testdata_prepared)
  var testdatakey = 'pdfbooks'
  var searchMode = 'Ludicrous Mode'
  var cache = {}
  const cacheChars = 'abcdefghijklmnopqrstuvwxyz'
  var promise, cachePromise, cacheCanceled, startms

  cacheNextLevel()

  function getSearchLower() { return $input.val().toLowerCase() }

  function search() {
    $input.focus()
    const inputValue = getSearchLower()

    if(cachePromise) { cachePromise.cancel() }; cacheCanceled = true

    if(searchMode==='Ludicrous Mode') {
      startms = Date.now()
      if(cache[testdatakey]&&cache[testdatakey][inputValue]) {
        renderCache(cache[testdatakey][inputValue])
        cacheNextLevel()
      } else {
        renderResults(fuzzysort.go(inputValue, testdata_prepared[testdatakey]))
        cacheNextLevel()
      }

    } else if(searchMode === 'Async') {
      if(promise) promise.cancel()

      startms = Date.now()
      promise = fuzzysort.goAsync(inputValue, testdata_prepared[testdatakey])
      promise.then(renderResults, err=>console.log(err))

    } else { // Sync
      startms = Date.now()
      renderResults(fuzzysort.go(inputValue, testdata_prepared[testdatakey]))
    }
  }

  function cacheNextLevel(nextIndex=0) {
    setTimeout(function() {
      if(nextIndex >= cacheChars.length+testdatakeys.length) return

      const inputValue = getSearchLower()
      var nextInputValue
      var nextdatakey
      if(nextIndex >= cacheChars.length) {
        nextInputValue = inputValue
        nextdatakey = testdatakeys[nextIndex - cacheChars.length]
      } else {
        nextInputValue = inputValue+cacheChars[nextIndex]
        nextdatakey = testdatakey
      }

      const isCached = cache[nextdatakey]&&cache[nextdatakey][nextInputValue]
      if(isCached) return cacheNextLevel(nextIndex + 1)

      if(nextIndex===0) cacheCanceled = false
      cachePromise = fuzzysort.goAsync(nextInputValue, testdata_prepared[nextdatakey])
      cachePromise.then(results => {
        if(cache[nextdatakey]===undefined) cache[nextdatakey] = {}
        cache[nextdatakey][nextInputValue] = {total:results.total, html:resultsToHtml(results)}
        if(!cacheCanceled) cacheNextLevel(nextIndex + 1)
      })
    })
  }

  function resultsToHtml(results) {
    var html = '<ul>'
    for (var i = 0; i < results.length; i++) {
      const result = results[i]
      html += `<li>
        <span class="sortScore " data-tooltip-score="Search Score">${result.score}</span>
        <span class="sortResult">${fuzzysort.highlight(result, open=$open, close=$close)}</span></li>`
    }
    html += '</ul>'
    return html
  }
  function renderResults(results) {
    const duration = Date.now() - startms
    const header = `<p>${results.total} matches in ${duration}ms</p>`
    const html = resultsToHtml(results)

    if(cache[testdatakey]===undefined) cache[testdatakey] = {}
    cache[testdatakey][getSearchLower()] = {total:results.total, html}

    $results.html(header+html)
  }
  function renderCache(cached) {
    const duration = Date.now() - startms
    const header = `<p>${cached.total} matches in ${duration}ms <small class="text-muted"><i>cached</i></small></p>`
    $results.html(header+cached.html)
  }

  // Run a search on input change
  $input.on('input', search)
  // Select input when escape pressed
  document.onkeyup = (e) => {
    if(e.keyCode === 27) $input.select()
  }
  // Focus input when any key pressed
  document.onkeydown = (e) => {
    $input.focus()
  }

  $('#async-buttons').html(`
    <div class="btn" data-toggle="buttons">
    ${['Async', 'Sync', 'Ludicrous Mode'].map(name => `
      <label class="btn btn-secondary ${name===searchMode?'active':''}">
      <input type="radio" name="searchMode" value="${name}"> ${name}
      </label>
      `).join('')}
    </div>
    `)
  $(document).on('change', '[name="searchMode"]', function() {
    searchMode = $(this).val()
    setTimeout(search)
  })

  $('#buttons').html(`
    <div class="btn-group" data-toggle="buttons">
    ${testdatakeys.map(name => `
      <label class="btn ${name===testdatakey?'active':''}">
      </label>
      <input type="radio"  name="testdatakeys" value="${name}"> ${name}
      `).join('')}
    </div>
    `)
  $(document).on('change', '[name="testdatakeys"]', function() {
    testdatakey = $(this).val()
    $input.attr('placeholder', testdatakey)
    setTimeout(search)
  })
})()


let b = document.getElementById('buttons');
let a = document.getElementById('async-buttons');
b.firstChild.nextSibling.childNodes[3].checked=true;
a.children[0].childNodes[5].firstElementChild.checked=true;
