import { GridLocaleText } from '@mui/x-data-grid';

export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'Nema redova',
  noResultsOverlayLabel: 'Nema pronađenih rezultata.',
  noColumnsOverlayLabel: 'Nema kolona',
  noColumnsOverlayManageColumns: 'Upravljanje kolonama',
  emptyPivotOverlayLabel:
    'Dodajte polja u redove, kolone i vrednosti da biste napravili pivot tabelu',

  // Density selector toolbar button text
  toolbarDensity: 'Gustina',
  toolbarDensityLabel: 'Gustina',
  toolbarDensityCompact: 'Kompaktna',
  toolbarDensityStandard: 'Standardna',
  toolbarDensityComfortable: 'Udobna',

  // Columns selector toolbar button text
  toolbarColumns: 'Kolone',
  toolbarColumnsLabel: 'Izaberi kolone',

  // Filters toolbar button text
  toolbarFilters: 'Filteri',
  toolbarFiltersLabel: 'Prikaži filtere',
  toolbarFiltersTooltipHide: 'Sakrij filtere',
  toolbarFiltersTooltipShow: 'Prikaži filtere',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktivnih filtera` : `${count} aktivan filter`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Pretraga…',
  toolbarQuickFilterLabel: 'Pretraga',
  toolbarQuickFilterDeleteIconLabel: 'Obriši',

  // Export selector toolbar button text
  toolbarExport: 'Izvoz',
  toolbarExportLabel: 'Izvoz',
  toolbarExportCSV: 'Preuzmi kao CSV',
  toolbarExportPrint: 'Štampaj',
  toolbarExportExcel: 'Preuzmi kao Excel',

  // Toolbar pivot button
  toolbarPivot: 'Pivot',

  // Toolbar AI Assistant button
  toolbarAssistant: 'AI Asistent',

  // Columns management text
  columnsManagementSearchTitle: 'Pretraga',
  columnsManagementNoColumns: 'Nema kolona',
  columnsManagementShowHideAllText: 'Prikaži/Sakrij sve',
  columnsManagementReset: 'Resetuj',
  columnsManagementDeleteIconLabel: 'Obriši',

  // Filter panel text
  filterPanelAddFilter: 'Dodaj filter',
  filterPanelRemoveAll: 'Ukloni sve',
  filterPanelDeleteIconLabel: 'Obriši',
  filterPanelLogicOperator: 'Logički operator',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'I',
  filterPanelOperatorOr: 'Ili',
  filterPanelColumns: 'Kolone',
  filterPanelInputLabel: 'Vrednost',
  filterPanelInputPlaceholder: 'Filter vrednost',

  // Filter operators text
  filterOperatorContains: 'sadrži',
  filterOperatorDoesNotContain: 'ne sadrži',
  filterOperatorEquals: 'jednako',
  filterOperatorDoesNotEqual: 'nije jednako',
  filterOperatorStartsWith: 'počinje sa',
  filterOperatorEndsWith: 'završava se sa',
  filterOperatorIs: 'je',
  filterOperatorNot: 'nije',
  filterOperatorAfter: 'je posle',
  filterOperatorOnOrAfter: 'je na ili posle',
  filterOperatorBefore: 'je pre',
  filterOperatorOnOrBefore: 'je na ili pre',
  filterOperatorIsEmpty: 'je prazno',
  filterOperatorIsNotEmpty: 'nije prazno',
  filterOperatorIsAnyOf: 'je bilo koje od',
  'filterOperator=': '=',
  'filterOperator!=': '≠',
  'filterOperator>': '>',
  'filterOperator>=': '≥',
  'filterOperator<': '<',
  'filterOperator<=': '≤',

  // Header filter operators text
  headerFilterOperatorContains: 'Sadrži',
  headerFilterOperatorDoesNotContain: 'Ne sadrži',
  headerFilterOperatorEquals: 'Jednako',
  headerFilterOperatorDoesNotEqual: 'Nije jednako',
  headerFilterOperatorStartsWith: 'Počinje sa',
  headerFilterOperatorEndsWith: 'Završava se sa',
  headerFilterOperatorIs: 'Je',
  headerFilterOperatorNot: 'Nije',
  headerFilterOperatorAfter: 'Posle',
  headerFilterOperatorOnOrAfter: 'Na ili posle',
  headerFilterOperatorBefore: 'Pre',
  headerFilterOperatorOnOrBefore: 'Na ili pre',
  headerFilterOperatorIsEmpty: 'Prazno',
  headerFilterOperatorIsNotEmpty: 'Nije prazno',
  headerFilterOperatorIsAnyOf: 'Bilo koje od',
  'headerFilterOperator=': 'Jednako',
  'headerFilterOperator!=': 'Nije jednako',
  'headerFilterOperator>': 'Veće od',
  'headerFilterOperator>=': 'Veće ili jednako',
  'headerFilterOperator<': 'Manje od',
  'headerFilterOperator<=': 'Manje ili jednako',
  headerFilterClear: 'Obriši filter',

  // Filter values text
  filterValueAny: 'bilo koje',
  filterValueTrue: 'tačno',
  filterValueFalse: 'netačno',

  // Column menu text
  columnMenuLabel: 'Meni',
  columnMenuAriaLabel: (columnName: string) => `Meni za kolonu ${columnName}`,
  columnMenuShowColumns: 'Prikaži kolone',
  columnMenuManageColumns: 'Upravljaj kolonama',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Sakrij kolonu',
  columnMenuUnsort: 'Ukloni sortiranje',
  columnMenuSortAsc: 'Sortiraj rastuće',
  columnMenuSortDesc: 'Sortiraj opadajuće',
  columnMenuManagePivot: 'Upravljaj pivotom',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktivnih filtera` : `${count} aktivan filter`,
  columnHeaderFiltersLabel: 'Prikaži filtere',
  columnHeaderSortIconLabel: 'Sortiraj',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} selektovanih redova`
      : `${count.toLocaleString()} selektovan red`,

  // Total row amount footer text
  footerTotalRows: 'Ukupno redova:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} od ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Izbor checkbox-a',
  checkboxSelectionSelectAllRows: 'Izaberi sve redove',
  checkboxSelectionUnselectAllRows: 'Poništi izbor svih redova',
  checkboxSelectionSelectRow: 'Izaberi red',
  checkboxSelectionUnselectRow: 'Poništi izbor reda',

  // Boolean cell text
  booleanCellTrueLabel: 'da',
  booleanCellFalseLabel: 'ne',

  // Actions cell more text
  actionsCellMore: 'više',

  // Column pinning text
  pinToLeft: 'Prikvači levo',
  pinToRight: 'Prikvači desno',
  unpin: 'Otkači',

  // Tree Data
  treeDataGroupingHeaderName: 'Grupisanje',
  treeDataExpand: 'prikaži decu',
  treeDataCollapse: 'sakrij decu',

  // Grouping columns
  groupingColumnHeaderName: 'Grupisanje',
  groupColumn: (name) => `Grupiši po ${name}`,
  unGroupColumn: (name) => `Prestani da grupišeš po ${name}`,

  // Master/detail
  detailPanelToggle: 'Preklop detalja',
  expandDetailPanel: 'Proširi',
  collapseDetailPanel: 'Skupi',

  // Pagination
  paginationRowsPerPage: 'Redova po stranici:',
  paginationDisplayedRows: ({ from, to, count, estimated }) => {
    if (!estimated) {
      return `${from}–${to} od ${count !== -1 ? count : `više od ${to}`}`;
    }
    const estimatedLabel =
      estimated && estimated > to ? `oko ${estimated}` : `više od ${to}`;
    return `${from}–${to} od ${count !== -1 ? count : estimatedLabel}`;
  },
  paginationItemAriaLabel: (type) => {
    if (type === 'first') return 'Idi na prvu stranicu';
    if (type === 'last') return 'Idi na poslednju stranicu';
    if (type === 'next') return 'Idi na sledeću stranicu';
    return 'Idi na prethodnu stranicu';
  },

  // Row reordering text
  rowReorderingHeaderName: 'Promena redosleda redova',

  // Aggregation
  aggregationMenuItemHeader: 'Agregacija',
  aggregationFunctionLabelSum: 'zbir',
  aggregationFunctionLabelAvg: 'prosek',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'maks',
  aggregationFunctionLabelSize: 'broj',

  // Pivot panel
  pivotToggleLabel: 'Pivot',
  pivotRows: 'Redovi',
  pivotColumns: 'Kolone',
  pivotValues: 'Vrednosti',
  pivotCloseButton: 'Zatvori pivot podešavanja',
  pivotSearchButton: 'Pretraži polja',
  pivotSearchControlPlaceholder: 'Pretraži polja',
  pivotSearchControlLabel: 'Pretraga polja',
  pivotSearchControlClear: 'Obriši pretragu',
  pivotNoFields: 'Nema polja',
  pivotMenuMoveUp: 'Pomeri gore',
  pivotMenuMoveDown: 'Pomeri dole',
  pivotMenuMoveToTop: 'Pomeri na vrh',
  pivotMenuMoveToBottom: 'Pomeri na dno',
  pivotMenuRows: 'Redovi',
  pivotMenuColumns: 'Kolone',
  pivotMenuValues: 'Vrednosti',
  pivotMenuOptions: 'Opcije polja',
  pivotMenuAddToRows: 'Dodaj u Redove',
  pivotMenuAddToColumns: 'Dodaj u Kolone',
  pivotMenuAddToValues: 'Dodaj u Vrednosti',
  pivotMenuRemove: 'Ukloni',
  pivotDragToRows: 'Prevuci ovde za redove',
  pivotDragToColumns: 'Prevuci ovde za kolone',
  pivotDragToValues: 'Prevuci ovde za vrednosti',
  pivotYearColumnHeaderName: '(Godina)',
  pivotQuarterColumnHeaderName: '(Kvartal)',

  // AI Assistant panel
  aiAssistantPanelTitle: 'AI Asistent',
  aiAssistantPanelClose: 'Zatvori asistenta',
  aiAssistantPanelNewConversation: 'Novi razgovor',
  aiAssistantPanelConversationHistory: 'Istorija razgovora',
  aiAssistantPanelEmptyConversation: 'Nema istorije upita',
  aiAssistantSuggestions: 'Predlozi',

  // Prompt field
  promptFieldLabel: 'Upit',
  promptFieldPlaceholder: 'Unesite upit…',
  promptFieldPlaceholderWithRecording: 'Unesite ili snimite upit…',
  promptFieldPlaceholderListening: 'Slušam upit…',
  promptFieldSpeechRecognitionNotSupported:
    'Prepoznavanje govora nije podržano u ovom pregledaču',
  promptFieldSend: 'Pošalji',
  promptFieldRecord: 'Snimaj',
  promptFieldStopRecording: 'Zaustavi snimanje',

  // Prompt
  promptRerun: 'Pokreni ponovo',
  promptProcessing: 'Obrada…',
  promptAppliedChanges: 'Izmene primenjene',

  // Prompt changes
  promptChangeGroupDescription: (column: string) => `Grupiši po ${column}`,
  promptChangeAggregationLabel: (column: string, aggregation: string) =>
    `${column} (${aggregation})`,
  promptChangeAggregationDescription: (column: string, aggregation: string) =>
    `Agregiraj ${column} (${aggregation})`,
  promptChangeFilterLabel: (
    column: string,
    operator: string,
    value: string
  ) => {
    if (operator === 'is any of') return `${column} je bilo koje od: ${value}`;
    return `${column} ${operator} ${value}`;
  },
  promptChangeFilterDescription: (
    column: string,
    operator: string,
    value: string
  ) => {
    if (operator === 'is any of')
      return `Filtriraj gde je ${column} bilo koje od: ${value}`;
    return `Filtriraj gde je ${column} ${operator} ${value}`;
  },
  promptChangeSortDescription: (column: string, direction: string) =>
    `Sortiraj po ${column} (${direction})`,
  promptChangePivotEnableLabel: 'Pivot',
  promptChangePivotEnableDescription: 'Omogući pivot',
  promptChangePivotColumnsLabel: (count: number) => `Kolone (${count})`,
  promptChangePivotColumnsDescription: (column: string, direction: string) =>
    `${column}${direction ? ` (${direction})` : ''}`,
  promptChangePivotRowsLabel: (count: number) => `Redovi (${count})`,
  promptChangePivotValuesLabel: (count: number) => `Vrednosti (${count})`,
  promptChangePivotValuesDescription: (column: string, aggregation: string) =>
    `${column} (${aggregation})`,
};
