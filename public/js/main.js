$(() => {
  let selectedEl = []
  let originalValues = []
  let key = {}
  let uploadingData = false
  $('#content-table tr').not(':first').dblclick(event => {
    event.stopPropagation()
    if (uploadingData) return
    if ($(event.currentTarget).hasClass('disabled')) {
      resetTable()
    } else {
      $('#content-table tr').not(event.currentTarget).addClass('disabled')
      const table = $(event.currentTarget).closest('table')
      const updateRows = table.data('update_rows')
      if (!updateRows) return
      if (!table.data('table')) {
        console.error('table name missing')
        return
      }
      const keyStr = table.data('key')
      if (!keyStr) {
        console.error('No key defined')
        return
      }
      $('#save-button').css({ display: 'inline-block' })
      const keyArr = keyStr.split(',')
      $(event.currentTarget).children('td').each(function (index) {
        const value = $(this).find('span').text()
        const col = $(this).data('col')
        if (col && keyArr.includes(col)) key[col] = value
        const dtype = $(this).data('dtype')
        const update = $(this).data('update')
        if (!dtype || !update) return
        let type = 'number'
        if (dtype.startsWith('varchar') || dtype.startsWith('text')) type = 'text'
        const input = $(`<input type="${type}" value="${value}" class="edit-box">`)
        selectedEl.push(input)
        originalValues.push(value)
        $(this).append(input)
      })

      if (keyArr.length != Object.keys(key).length) {
        console.log('Key/parts of key missing')
        resetTable()
      }
    }
  })

  $('body').not('#content-table').dblclick(event => {
    resetTable()
  })

  const resetTable = function () {
    if (uploadingData) return
    $('#content-table tr').removeClass('disabled')
    $('#save-button').css({ display: 'none' })
    selectedEl.forEach(item => {
      $(item).remove()
    })
    selectedEl = []
    originalValues = []
    key = {}
  }

  $('#save-button').click(function () {
    uploadingData = true
    $(this).prop('disabled', true)
    const changedVals = {}
    for (let i = 0; i < selectedEl.length; ++i) {
      const input = selectedEl[i]
      $(input).prop('disabled', true)
      if ($(input).val() !== originalValues[i]) changedVals[$(input).closest('td').data('col')] = $(input).val()
    }
    if (Object.keys(changedVals).length == 0) {
      alert('No change')
      uploadingData = false
      $(this).prop('disabled', false)
      resetTable()
      return
    }
    const data = JSON.stringify({ values: changedVals, key })
    console.log(data)
    const tableName = $('#content-table').data('table')
    const that = $(this)
    $.ajax({
      type: 'POST',
      url: `/update/${tableName}`,
      data: data,
      contentType: 'application/json',
      dataType: 'json'
    }).done(function(reply){
      uploadingData = false
      $(that).prop('disabled', false)
      for (let i = 0; i < selectedEl.length; ++i) {
        const input = selectedEl[i]
        if ($(input).closest('td').data('col') in changedVals) $(input).closest('td').find('span').text($(input).val())
      }
      resetTable()
    }).fail(function (xhr, status, error) {
      console.log(error)
      console.log(status)
      uploadingData = false
      $(that).prop('disabled', false)
      for (let i = 0; i < selectedEl.length; ++i) {
        const input = selectedEl[i]
        $(input).prop('disabled', false)
      }
      alert('Failed: ' + error)
    })
  })
})
