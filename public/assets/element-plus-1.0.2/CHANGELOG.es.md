## Changelog

### 1.0.2-beta.34

*2021-03-12*

#### Bug fixes
- Fix slider warning of modelValue (#1622)
- Fix tree auto expand parent on set current key and node (#1502)
- Fix avatar watch invalid when src is missing from props (#1615)
- Fix select tag can't close if the option is disabled (#1605)
- Fix table the bug that cannot watch data (#1612)
- Fix cascader-panel no loaded nodes should not be checked (#1583)
- Fix cascader prevent log error for before filter (#1582)
- Fix some components miss install type (#1547)
- Fix pagination current-page event error emit (#1575)
- Fix select option migrate error (#1574)
- Fix popover panel disappear when hover on panel (#1573)
- Fix table fix #1572 (#1592)
- Fix table fix #1591 (#1593)
- Fix radio type order (#1554)
- Fix time-picker replace test `it.only` with `it` in test (#1586)
- Fix popper simplify mapEvents logic & add  (#1541)
- Fix pagination component layout prop bug (#1576)
- Fix select disabled group not works (#1559)
- Fix dropdown dropdown will expand when unexpected (#1569)
- Fix table table column resize not work (#1567) …

### 1.0.2-beta.33

*2021-03-03*

#### Bug fixes

- Fix cascader-panel  value can be falsy value (#1533)
- Fix scss error (#1542)
- Fix popper error cause by vue version update (#1556)
- Fix col will always be hidden when responsive span is zero (#1532)
- Fix empty svg render not normal in multiple tab-pane (#1534)
- Fix layout gutter bug (#1537)
- Fix select options watch flush post (#1513)
- Fix select noMatchText error show (#1523)
- Fix avatar  need reset hasLoadError to false, if src changed (#1515)
- Fix input remove invalid attrs after render (#1489)
- Fix select emit blur event (#1504)
- Fix table bug of invalid tooltipEffect prop (#1470)
- Fix table column default rendering errors (#1433) …
- Fix scrollbar update bar when window resize (#1456)
- Fix autocomplete migration error (#1493)
- Fix message-box miss overlay style when on demand import (#1494)

### 1.0.2-beta.32

*2021-01-31*

#### Bug fixes

- Fix switch cannot change width dynamically (#1435)
- Fix PopConfirm translation error (#1450)
- Fix date range picker input issue (#1439)
- Fix date picker second clear not trigger change event #1438
- Fix behavior of tooltip (#1443)
- Fix bug cause by scrollToOption (#1440)
- Fix the issue which caused input area render error on Safari (#1429)
- Fix shadow rendering bug of initializing fixed columns (#1418)
- Fix popper trigger ref cannot be fetched (#1419)
- Remove tab incorrect highlight style (#1416)
- Fix type check error of message (#1413)
- Fix that the column width is calculated incorrectly (#1381)
- Fix popper position error (#1411)
- Fix style of demo card header (#1405)
- Fix upload list remove animation incorrect (#1379)

#### Features

- feat(carousel): add pause-on-hover prop (#1423)
- feat(dropdown): add max-height prop of menu (#1436)
- feat(progress): add default slot (#1426)

#### Chore updates

- docs: remove auto-complete of input and select (#1437)
- css prefix (#1407)
- docs(project): Update `importing on demand` section in `quickstart.md, to solve the issue which caused importing on demand not working (#1414)
- Fix dome-block bottom bar width error when fixed (#1406)

### 1.0.2-beta.31

*2021-01-31*

#### Bug fixes

- Fix Select can not scroll to default option (#1397)
- Fix Select tag's text is empty string when multiple with remote (#1393)
- Fix Tree error cause by child node's data is not reactive (#1396)
- Update Button change height to min-height (#1402)
- Fix Tree every node @check-change event fire only once (#1390)
- Fix Notification remove dom when destoryed (#1378)
- Fix Message component trigger many times bug #1269 (#1270)
- Fix ColorPicker compilation errors caused by switch (#1375)
- Fix Table column insertion disorder (#1329)
- Fix Popover z-index won't update when popover is shown (#1364)
- Update Dialog to accept number type (#1373)
- Fix Pagination jumper style error (#1372)
- Fix Col style gets affected by invalid value bug (#1370)
- Fix table remove tooltip when the component destroyed (#1245)
- Update Scrollbar when scrollbar isn't shown, hide the bar (#1342)
- Fix MessageBox remove default button text which caused i18n not working (#1357)
- Fix Popper api consistency (#1354)
- Fix dropdown/select/picker popper position error when has line-height (#1349)
- Fix DatePicker modify the judgment logic of startDate and endDate (#1322)
- Refactor Message and Notification component with VCA (#1387)

#### Chore updates

- Update Axure resource v2.1.0 (#1400)

### 1.0.2-beta.30

*2021-01-25*

#### Bug fixes

- Fix dropdown/select/picker popper position error when has line-height (#1349)
- Fix DatePicker modify the judgment logic of startDate and endDate (#1322)
- Fix full bundle export bug (#1350)

### 1.0.2-beta.29

*2021-01-25*

#### New feature

- Add type 'contextmenu' trigger for Dropdown (#1286)

#### Bug fixes

- Fix i18n bundle error (#1346)
- Fix Drawer error size prop to support Number (#1335)
- Fix affix to change target.value to props.target in judgement (#1343)
- Fix carousel don't update the indicator and items when data change(#1244)
- Fix fixed table height error when no data(#1332)
- Fix table header checkbox can be triggered when disabled(#1333)
- Repair table column width calculation abnormal (#1334)
- Fix image incorrect custom object-fit ratio (#1338)
- Fix color-picker can't select 8-digit hex color (#1323)

### 1.0.2-beta.28

*2021-01-20*

#### New feature

- Support vue-i18n@next (#1306)

#### Bug fixes

- Add tags and attributes completions for Vetur (#1303)
- Fix table when the data changes, the table does not update the layout (#1315)
- Fix table bug of table-column property watching (#1309)
- Fix loading transition invalid (#1321)
- Fix checkbox migrate error (#1293)
- Fix notification style when its type set and title not set (#1288)
- Fix tree node not render in lazy (#1298)
- Fix slider can't drag in mobile (#1299)
- Fix table column insertion disorder BUG
- Fix table checkbox in table header style error (#1292)
- Fix table migrate error (#1294)

### 1.0.1-beta.27

*2021-01-15*

#### Bug fixes

- Fix overlay overflowing issue (#1282)
- Fix loading directive cannot dispatch for the second time (#1281)
- Fix Date picker bind attr to panel error (#1277)

### 1.0.1-beta.26

*2021-01-14*

#### New feature

- New component `Affix` (#1210)

#### Bug fixes

- Fix overlay event triggering issue (#1235)
- Fix form add missing emits (#1272)
- Fix switch id of input can't be empty (#1273)
- Fix table filter icon height of table header (#1233)
- Fix col lacking props named tag (#1264)
- Fix input-number increase/decrease button not work (#1259)

### 1.0.1-beta.24

*2021-01-11*

#### Bug fixes

- Fix time picker scroll bug (#1227)
- Fix tree node don't update after push new node into parent (#1231)
- Fix loading error show when parent's display is not block (#1250)
- Fix input-number behavior error (#1252)
- Fix select emptyText error show (#1213)
- Fix select to replace symbols to strings to avoid individual importing symbol bug (#1224)

### 1.0.1-beta.23

*2021-01-07*

#### New feature

- New component `ElEmpty` (#1210)

#### Bug fixes

- Fix dropdown menu stop-popper-mouse-event (#1219)
- Fix menu item group not working (#1217)

#### Chore updates

- Bumping dep versions (#1214)

### 1.0.1-beta.22

*2021-01-06*

#### Bug fixes

- Fix menu item not expanding correctly (#1212)
- Fix popover hijacking mouse event bug (#1201)

#### Chore updates

- Update contain doc style (#1204)

### 1.0.1-beta.21

*2021-01-05*

#### Bug fixes

- Separate ImageViewer component (#1199)
- Fix YearPicker disabledDate bug (#1193)
- Fix Dialog render bug (#1144)
- Fix Tree deep watch data (#1188)
- Fix Popper transition lost bug (#1190)
- Fix Popover clickoutside not working bug (#1171)
- Fix Textarea line-height style bug (#1181)

### 1.0.1-beta.19

*2021-01-02*

#### Bug fixes

- Fix WeekPicker should return the first day of the week (#1169)
- Fix Dialog close event (#1164)
- Fix Select prop type missing array (#1168)

### 1.0.1-beta.18

*2020-12-31*

#### Bug fixes

- Fix timepicker keyevent bug (#1151)
- Bumping vue version to 3.0.5 (#1159)
- Fix table when the data changes, the layout is not updated bug (#1059)
- Fix Module @vue/test-utils has no exported members bug (#1139)
- Fix scrollbar mouseup event bug (#1123)
- Fix select props modelValue type error (#1158)

### 1.0.1-beta.15

*2020-12-27*

#### Bug fixes

- Fix cascader panel bug (#1112)
- Fix date-picker clear bug (#1114)
- Update build logic (#1118)
- Fix notification style bug (#1122)

### 1.0.1-beta.14

*2020-12-24*

#### Bug fixes

- Export textarea method resizeTextarea (#1032)
- Fix table column not deleted bug (#1062)
- Fix scrollbar mouseup scroll bug (#1066)
- Fix slider mouseup scroll bug (#1066)
- Fix pagination v-model of page-size not work (#1079)
- Fix app.use(comp.vue) type (#1067)
- Fix the style of scrollbar (#1042)
- Fix color-picker drag (#1084)
- Fix table z-index (#1078)

### 1.0.1-beta.11

*2020-12-21*

#### New features

- Add Skeleton compontent (#953)

#### Bug fixes

- Fix input add placeholder (#1052)
- Fix date-picker bind $attrs issue (#1069)
- Fix popper use EmitType to replace string (#1053)
- Fix table border style (#1056)

### 1.0.1-beta.10

*2020-12-18*

#### New features

- Add Space Component (#1002)

#### Bug fixes

- Fix select content overflow in multiple select (#967)
- Fix table global config (#999)

### 1.0.1-beta.9

*2020-12-16*

#### Bug fixes

- Fix menu collapse animation failure (#1003)
- Fix timepicker / datepicker fragment error (#1009)
- Update time select (#1014)
- Fix dialog can't scroll if the content too large (#993)
- Fix tree keyboard navigation bug (#995)
- Fix table filter-panel style (#943)
- Fix dialog header slot (#997)
- Fix native scrollbar not hide when `native` is not true (#971)

### 1.0.1-beta.8

*2020-12-12*

#### Bug fixes

- Fix table style bug (#969)
- Fix some components import type (#959)
- Fix popover with pure should has border (#954)
- Fix export locale (#950)
- Fix menu open method error (#952)
- Fix collapse not emitting change (#949)
- Fix dialog bouncing (#955)

### 1.0.1-beta.7

*2020-12-10*

#### Bug fixes

- Fix select multi mode rendering (#941)
- Fix notification left empty divs (#913)
- Fix upload bug (#927)
- Add input placeholder type (#814)
- Fix cascader-panel checked nodes not update when options change (#934)
- Update col layout style (#875)
- Fix drawer layout issue (#924)

### 1.0.1-beta.6

*2020-12-09*

#### Bug fixes

- Fix error PropType (#906)
- Fix tree right click event bug (#886)
- Fix form-item props undefined bug (#888)
- Fix autocomplete clearable doesn't work (#892)
- Fix color-picker can not select color (#896)
- Fix popper attr style fallthrough failed (#897)
- Fix color-picker popper-class invalid (#883)
- Fix tree document bug (#873)
- Fix upload file slot not work bug (#868)

### 1.0.1-beta.5

*2020-12-07*

#### Bug fixes

- Fix input non-emit events such as keyup not work (#866)
- Fix Select.focus is undefined bug (#862)
- Optimize useAttrs signature (#864)
- Fix table ts error (#863)
- Fix table avoiding the error of el-table-column rendering (#828)
- Fix popper gets covered by dialog/drawer (#861)
- Fix drawer implementation with hook (#817)
- Fix exporting fix for volar (#849)
- Fix cascader render error of radio label (#859)
- Fix pagination known issues (#811)
- Fix select error style of select-dropdown (#838)

### 1.0.1-beta.4

*2020-12-05*

#### Bug fixes

- Complete show-overflow-tooltip (#736)
- Remove dropdown outline (#798)
- Fix popover positioning (#796)
- Fix on demand importing dialog lacking overlay css (#809)
- Fix select value did not match issue (#808)
- Fix select height error bug (#834)
- Fix ts name error (#813)
- Fix popper border .is-light style bug (#829)
- Fix form-item auto width bug (#830)
- Set popper appendToBody to true by default (#845)

### 1.0.1-beta.3

*2020-12-03*

#### Bug fixes

- Fix nested menu ref unwrap value problem (#775)
- Fix alert style errors when no description (#782)
- Fix dialog show-close is invalid (#773)
- Destructing import from lodash (#788)
- Fix popper transition with 'el-zoom-in-top' (#785)

### 1.0.1-beta.2

*2020-12-02*

#### Bug fixes

- Fix navigation menu potential bug (#768)

### 1.0.1-beta.1

*2020-12-01*

#### Bug fixes

- Fix router behavior (#745)
- Add esm bundle (#577)
- Fix date picker referencing issue (#757)
- Fix pagination current-change event not emitting (#756)
- Fix `bodyStyle` bug (#754)
