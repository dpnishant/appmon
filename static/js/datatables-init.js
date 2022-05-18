/**
 * Web UI user settings
 *
 * @property separateColumns: Draw vertical line for each column
 * @property separateRows: Draw horizontal line for each row
 * @property virtualIndex: Enumerate each row with an virtual index, and set 'visibility = enabled' by default
 * @property groupBy: Collect data from database and display grouped by column name(in database). Keep empty string to disable
 */
const WebUiSettings = {
    separateColumns: false,
    separateRows: true,
    virtualIndex: false,
    groupBy: ''
}

const appName = new URLSearchParams(window.location.search).get('app');
var table = null;

function get_LastRowId() {
    var max = 0;
    $("td[data-dt-column='0']").each(function() {
        $this = parseInt($(this).text());
        if ($this > max)
            max = $this;
    });
    //console.log(max);
    return max;
}

function ui_rearrange() {
    var checkBoxHtml = `<div class="checkbox-no-text checkbox button small" title="Autoupdate table (Every 2sec)">
                          <label>
                           <input id="autoupdate_table_cb" type="checkbox" value="">
                           <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label>
                        </div>`;
    $('.dt-buttons.button-group').append(checkBoxHtml);
    var element = $('#tblResultView_filter').detach();
    $('.dt-buttons.button-group').append(element);

    $("#tblResultView_filter").attr('title', 'Search in database');
    $("#tblResultView_filter").addClass('button');
    $("#tblResultView_filter").prepend('<div class="search-button"><i class="fa fa-search"></i></div>');

    $('#tblResultView_filter').click(function(event) {
        if($(event.target).is('INPUT')) {
            return;
        }
        $('.dataTables_filter label').slideToggle('fast');
        var box = $('.dataTables_filter input').clone(true, true);
        $('#tblResultView_filter label').html(box);
        if ( $('.dataTables_filter input').is(':visible') ) {
            $("#tblResultView_filter").addClass('searchbox_visible');
            $("div.dataTables_wrapper div.dataTables_filter input").addClass('searchbox_visible');
        } else {
            $('#tblResultView_filter').removeClass('searchbox_visible');
            $('div.dataTables_filter input').removeClass( 'searchbox_visible');
        }
        $('.dataTables_filter input').focus();
    });

    <!-- Add class for dropdown menu to keep it fixed on top -->
    $('.buttons-collection.dropdown').click(function() {
        $('.dt-button-collection.f-dropdown').addClass('dropdown-menu-fixed');
    });
}

function clearDBTable() {
    if (confirm('Are you sure you want to clear data?\n(This action will remove all records permanently)')) {
        $.ajax({
            url: '/api/clear_table',
            type: 'get',
            data: {
                app: appName
            }
        })
        .done(function() {
            alert(`All records for the ${appName} has been successfully cleared`);
            table.ajax.reload();
            return true;
        })
        .fail(function() {
            alert(`Error on table clearing`);
            return false;
        })
    } else {
        return false;
    }
}

jQuery.fn.dataTableExt.oApi.fnTruncateCells = function (oSettings, aiColumnMaxChars) {
    /*
    * Type:        Plugin for DataTables (www.datatables.net) JQuery plugin.
    * Name:        dataTableExt.oApi.fnTruncateCells
    * Version:     1.0.0
    * Description: Truncates table cells to length specified in <th data-maxChars> attribute.
    *              Puts ellipses in place of last 3 characters, and pre-truncated
    *              cell data in cell's title attribute.
    * Inputs:      object:oSettings - dataTables settings object
    *              array: aoColumnMaxChars - an array, element 0 being left most, containing a positive integer or null for each column.
    *              Null means do not truncate column, positive integer means to only allow that many characters to display in the column text.
    *
    * Returns:     JQuery
    * Usage:       $('#example').dataTable().fnTruncateCells();
    * Requires:   DataTables 1.7.0+
    *
    * Author:      Justin Pate
    * Created:     26/7/2012
    * Language:    Javascript
    * License:     GPL v2 or BSD 3 point style
    * Contact:     justin.pate /AT\ gmail.com
    * Documentation: https://bitbucket.org/JustinP8/datatables.truncatecells/src
    */
    this.each(function (i) {
        $.fn.dataTableExt.iApiIndex = i;
        var baseFunction = (oSettings.fnRowCallback) ? oSettings.fnRowCallback : function () { };
        oSettings.fnRowCallback = function (nRow) {
            baseFunction(nRow);
            $('td', nRow).each(function (index) {
                var maxChars = (typeof aiColumnMaxChars !== 'undefined') ? aiColumnMaxChars[index] : oSettings.aoColumns[index].nTh.getAttribute('data-maxChars');
                if (maxChars) {
                    var unfilteredText = $(this).text();
                    if (unfilteredText.length > maxChars && maxChars > 3) {
                        $(this).attr('title', unfilteredText);
                        $(this).html(unfilteredText.substring(0, maxChars) + '...');
                    }
                }
            });
            return nRow;
        };
        return this;
    });
    return this;
};

$(document).ready(function() {
    /*
    $.extend( true, $.fn.dataTable.defaults, {
        column: {
            render: $.fn.dataTable.render.text()
        }
    });
    */
    const columnSeparationClassName = (WebUiSettings.separateColumns ? ' table-column-separated' : '') +
        (WebUiSettings.separateRows ? ' table-row-separated' : '');

    // $('#tb_header').prepend('<th class="table-header table-row-separated sorting_disabled" rowspan="1" colspan="1">#</th>');

    /**
     * Setup table options: https://datatables.net/reference/option/
     * Examples: https://datatables.net/examples/index
     */
    table = $('#tblResultView').DataTable({
        info: true,
        paging: true,
        processing: false,
        bAutoWidth: false,
        autoWidth: false,
        colReorder: true,
        scrollY: true,
        scrollX: true,
        scrollCollapse: false,
        dom: 'Bfrtip',
        ajax: {
            url: '/api/fetch',
            data: function (uri) {
                uri.id = get_LastRowId();
                uri.app = appName;
                uri.grouped = WebUiSettings.groupBy;
            }
        },
        search: {
            caseInsensitive: true,
            smart: true
        },
        fixedHeader: {
            header: false,
            footer: false
        },
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                orderable: false,
            },
            {
                targets: '_all',
                searchable: true,
                orderable: true,
                className: 'table-header' + columnSeparationClassName,
            }
        ],
        // Data structure checkout: table.data()
        columns: [
            { data: 'id' },
            { data: 'id' },
            { data: 'time' },
            { data: 'operation' },
            { data: 'module' },
            { data: 'method' },
            { data: 'artifact' },
            { data: 'remark' }
        ],
        order: [[ 2, 'desc' ]],
        lengthMenu: [
            [ 15, 30, 50, 100, -1 ],
            [ '15 rows', '30 rows', '50 rows', '100 rows', 'Show all' ]
        ],
        buttons: [
            {
                text:      '<i class="fa fa-home"></i>',
                titleAttr: 'App selection page',
                action: function (e, dt, button, config) {
                    window.location = '/';
                }
            },
            {
                extend:    'copyHtml5',
                text:      '<i class="fa fa-files-o"></i>',
                titleAttr: 'Copy'
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel'
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV'
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF'
            },
            {
                extend: 'pageLength',
                text: '<i class="fa fa-bars"></i>',
                titleAttr: 'Table Length'
            },
            {
                extend: 'colvis',
                text: '<i class="fa fa-eye-slash"></i>',
                titleAttr: 'Columns visibility',
                postfixButtons: ['colvisRestore']
            },
            {
                text: 'Refresh',
                titleAttr: 'Update data',
                action: function (e, dt, node, config) {
                    dt.ajax.reload();
                }
            },
            {
                text: 'Clear',
                titleAttr: 'Remove all records from the database for the current app',
                action: function (e, dt, node, config) {
                    if (clearDBTable()) {
                        dt.ajax.reload();
                    }
                }
            }
        ],
    });

    ui_rearrange();

    $('#tblResultView').dataTable().fnTruncateCells([30, 30, 30, 30, 30, 30, 30]);

    // https://datatables.net/examples/api/counter_columns.html
    table.on('order.dt search.dt', function () {
        let i = 1;
        table.cells(null, 0, { search:'applied', order:'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();

    table.column(0).visible(WebUiSettings.virtualIndex);


    /* Table autoupdate checkbox */
    $('#autoupdate_table_cb').change(function() {
        this.disabled = true;
        if(this.checked) {
            window.autoUpdateInterval = window.setInterval($('#tblResultView').DataTable().ajax.reload, 2000);
        }
        else {
            window.clearInterval(window.autoUpdateInterval);
        }
        this.disabled = false;
    });

    var header_container = $('#header_container');
    var footer_container = $('#footer_container');

    var tblResultView_info = $('#tblResultView_info').detach();
    var tblResultView_paginate = $('#tblResultView_paginate').detach();
    var colSearchContainer = $('#colSearchContainer').detach();
    var buttonGroup = $('.dt-buttons.button-group').detach();

    header_container.append(buttonGroup);
    footer_container.append(tblResultView_info);
    footer_container.append(tblResultView_paginate);
    footer_container.append(colSearchContainer);

    $('.dataTables_scrollBody').attr('style', '');

    /*

    // DataTable
    var table = $('#tblResultView').DataTable();

    // Setup - add a text input to each footer cell

    // $('#tblResultView thead th').each(function () {
    //    var title = $(this).text();
    //   $('#colSearchContainer').html($('#colSearchContainer').html() + '<input type="text" placeholder="Search ' + title + '" />' );
    // });

    // Apply the search

    table.columns().every( function () {
        var that = this;
        $('input', this.footer() ).on( 'keyup change', function () {
            if (that.search() !== this.value ) {
                that.search(this.value).draw();
            }
        });
    });
    */
});
