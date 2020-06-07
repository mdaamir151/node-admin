/* global $, settings */

$(() => {
  let _selectedEl = []
  let _originalValues = []
  let _key = {}
  let _uploadingData = false
  let _dateTimeFormat = null
  let _newRow = null
  const _table = $('#content-table')
  const _keyStr = _table.data('key')
  let _tempKeys = []
  if (_keyStr) _tempKeys = _keyStr.split(',')
  const _keyArr = _tempKeys
  const _tableName = _table.data('table')
  const _tableInsertRowAllowed = _table.data('insert_rows') || false
  const _tableDeleteRowAllowed = _table.data('delete_rows') || false
  const _tableUpdateRowAllowed = _table.data('update_rows') || false
  let _mode = '' // selection or //addition
  if (settings) {
    _dateTimeFormat = `${settings.datePickerSettings.dateFormat}${settings.datePickerSettings.dateTimeSeparator}${settings.datePickerSettings.timeFormat}`
  }

  !_tableUpdateRowAllowed && $('#save-button').css({ display: 'none' })
  !_tableDeleteRowAllowed && $('#delete-button').css({ display: 'none' })
  _tableInsertRowAllowed ? $('#add-button').css({ display: 'inline-block' }) : $('#add-button').css({ display: 'none' })

  const formatDates = function () {
    const inp = $('<input type="text" style="display: none">')
    $('body').append(inp)
    const dp = $(inp).datepicker(settings.datePickerSettings).data('datepicker')
    $('.dt-unixtimestamp').children('span').each(function () {
      const time = Number($(this).text())
      if (!isNaN(time) && time > 0 && settings) {
        $(this).text(dp.formatDate(_dateTimeFormat, new Date(time)))
      }
    })
  }

  if (settings) formatDates()

  $('#content-table').on('dblclick', 'tr:not(:first-child)', event => {
    event.stopPropagation()
    if (_uploadingData) return
    resetAdditionMode()
    if ($(event.currentTarget).hasClass('disabled')) {
      resetTable()
    } else {
      $('#content-table tr').not(event.currentTarget).addClass('disabled')
      if (!isStateValid()) return
      setRowSelected(event.currentTarget)
      if (!_tableUpdateRowAllowed) return
      $(event.currentTarget).children('td').each(function (index) {
        const update = $(this).data('update')
        if (!update) return
        activateCell($(this))
      })
    }
  })

  $('body').not('#content-table').dblclick(event => {
    resetTable()
  })

  const resetTable = function () {
    if (_uploadingData) return
    resetAdditionMode()
    _mode = ''
    $('#content-table tr').removeClass('disabled')
    _tableUpdateRowAllowed && $('#save-button').css({ display: 'none' })
    _tableDeleteRowAllowed && $('#delete-button').css({ display: 'none' })
    _tableInsertRowAllowed && $('#add-button').css({ display: 'inline-block' })
    _selectedEl.forEach(item => {
      $(item).remove()
    })
    _selectedEl = []
    _originalValues = []
    _key = {}
  }

  const resetAdditionMode = function() {
    if (_newRow) $(_newRow).remove()
    _newRow = null
    $('#save-button').css({'display': 'none'})
    _tableInsertRowAllowed && $('#add-button').css({'display': 'inline-block'})
  }

  $('#save-button').click(function () {
    _uploadingData = true
    $(this).prop('disabled', true)
    let data = ''
    const values = getUpdateValues()
    let url = ''
    if (Object.keys(values).length === 0) {
      alert('No change')
      _uploadingData = false
      $(this).prop('disabled', false)
      resetTable()
      return
    }
    if (_mode === 'selection') {
      data = JSON.stringify({ values, key: _key })
      url = `/update/${_tableName}`
    } else if (_mode === 'addition') {
      data = JSON.stringify({ values })
      url = `/insert/${_tableName}`
    }
    const that = $(this)
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      contentType: 'application/json',
      dataType: 'json'
    }).done(function (reply) {
      _uploadingData = false
      $(that).prop('disabled', false)
      for (let i = 0; i < _selectedEl.length; ++i) {
        const input = _selectedEl[i]
        if ($(input).closest('td').data('col') in values) $(input).closest('td').find('span').text($(input).val())
      }
      _newRow = null
      resetTable()
    }).fail(function (xhr, status, error) {
      console.error(error)
      console.log(status)
      _uploadingData = false
      $(that).prop('disabled', false)
      for (let i = 0; i < _selectedEl.length; ++i) {
        const input = _selectedEl[i]
        $(input).prop('disabled', false)
      }
      alert('Failed: ' + error)
    })
  })

  $('#delete-button').click(function () {
    const ans = confirm('Do you want to delete row?')
    if (ans) deleteRow(this)
    else resetTable()
  })

  const getUpdateValues = function () {
    const changedVals = {}
    for (let i = 0; i < _selectedEl.length; ++i) {
      const input = _selectedEl[i]
      let origVal = _originalValues[i]
      $(input).prop('disabled', true)
      const td = $(input).closest('td')
      let val = $(input).val()
      if (td.data('dtype') === 'boolean') {
        val = getBoolean(val)
        origVal = getBoolean(origVal)
      }
      if (val !== origVal) {
        if (td.data('dtype') === 'unixtimestamp') {
          val = new Date(val).getTime()
        }
        changedVals[td.data('col')] = val
      }
    }
    return changedVals
  }

  const deleteRow = function (button) {
    const data = JSON.stringify({ key: _key })
    _uploadingData = true
    $(this).prop('disabled', true)
    $.ajax({
      type: 'POST',
      url: `/delete/${_tableName}`,
      data: data,
      contentType: 'application/json',
      dataType: 'text'
    }).done(function (reply) {
      _uploadingData = false
      $(button).prop('disabled', false)
      resetTable()
      window.location.reload()
    }).fail(function (xhr, status, error) {
      console.error(error)
      console.log(status)
      _uploadingData = false
      $(button).prop('disabled', false)
      alert('Failed: ' + error)
    })
  }

  const isStateValid = function () {
    if (!_tableName) {
      console.error('table name missing')
      return false
    }
    if (!_keyArr.length === 0) {
      console.error('No key defined')
      return false
    }
    return true
  }

  const setRowSelected = function (tr) {
    _mode = 'selection'
    $(tr).children('td').each(function(){
      let col = $(this).data('col')
      let val = $(this).find('span').text()
      if (col && _keyArr.includes(col)) _key[col] = val
    })
    _tableUpdateRowAllowed && $('#save-button').css({ display: 'inline-block' })
    _tableInsertRowAllowed && $('#add-button').css({ display: 'none' })
    _tableDeleteRowAllowed && $('#delete-button').css({ display: 'inline-block' })
  }

  const activateCell = function (td) {
    let value = $(td).find('span').text()
    const dtype = $(td).data('dtype')
    let type = 'text'
    if (!dtype) return
    if (dtype === 'number') type = 'number'
    let input = $(`<input type="${type}" value="${value}" class="edit-box">`)
    if (dtype === 'unixtimestamp' && settings) {
      const dp = $(input).datepicker(settings.datePickerSettings).data('datepicker')
      dp.selectDate(new Date(value))
    } else if (dtype === 'boolean') {
      value = getBoolean(value)
      let trueSelected = ''
      let falseSelected = ''
      if (value) trueSelected = 'selected'
      else falseSelected = 'selected'
      input = $(`<select class="edit-box"><option value="true" ${trueSelected}>true<option value="false" ${falseSelected}>false</select>`)
    }
    _selectedEl.push(input)
    _originalValues.push(value)
    $(td).append(input)
  }

  $('#add-button').click(function () {
    const tr = $('<tr/>')
    $('#content-table').find('tr:first').children('th').each(function () {
      const colName = $(this).data('col')
      const update = $(this).data('allow_update')
      const type = $(this).data('dtype')
      let defaultVal = $(this).data('default')
      const nullable = $(this).data('nullable')
      if (type !== 'number') defaultVal = defaultVal || ''
      if (colName === 'serial-no') {
        const count = $('#content-table').find('tr:first').parent().children('tr').length
        $(tr).append($(`<td data-update="false" data-col="${colName}" class="dt-number"><span>${count}</span></td>`))
      } else {
        let cls = `dt-${type}`
        if (!nullable) cls = cls + ' not-null'
        const td = $(`<td data-update="${update}" data-col="${colName}" data-dtype="${type}" data-nullable="${nullable}" class="${cls}"><span>${defaultVal}</span></td>`)
        $(tr).append(td)
        activateCell(td)
      }
    })
    $('#content-table').find('tr:first').parent().append(tr)
    $('html, body').stop().animate({ scrollTop: $(tr).offset().top }, 500)
    _mode = 'addition'
    _newRow = tr
    _tableInsertRowAllowed && $('#add-button').css({'display': 'none'})
    _tableInsertRowAllowed && $('#save-button').css({'display': 'inline-block'})
  })

  $('th').click(function(){
    let th = $(this)
    let colName = th.data('col')
    let sortOrder = th.data('sort')
    if (_tableName && colName) {
      if (sortOrder === 'asc') window.location = `/table/${_tableName}?sort_by=${colName}&sort_order=desc`
      else window.location = `/table/${_tableName}?sort_by=${colName}&sort_order=asc`
    }
  })

  const getBoolean = function (val) {
    const fls = !val || val === 'false'
    return !fls
  }
})
