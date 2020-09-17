<!--
 * @Author: your name
 * @Date: 2020-09-15 15:18:37
 * @LastEditTime: 2020-09-17 14:26:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \calendarf:\GIT\calendar-pro\README.md
-->
# 基于jq的-日历组件
[jquery官网](https://jquery.com/)
## 参数:
| 参数        |           可选值              |  注释  |
| --------   |           -----:              | :----: |
| ele        | .demo-box'                  |  依附   |
| types      | Yield detail                  |   数据类型 |
| date       | day year                      |   时间类型 |
| data       | [date:x,date:x]  |   数据数组 |

## 事件:
| 事件      | 参数    |  注释  |
| --------   | -----:  | :----: |
| init_calendar     | dataArr,types,date |  初始化  |
| change_time_type      | val|  切换时间  |
|  getActive    |  getActive |  获取选中时间  |

## 效果图
![](https://github.com/Lingtian007/calendar-pro/blob/master/img/calendar_2.gif)